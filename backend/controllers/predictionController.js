import Prediction from '../models/Prediction.js';
import User from '../models/User.js';
import { sanitizeObject, sanitizeHtml } from '../utils/validators.js';

export async function listPredictions(req, res) {
  try {
    const { category, status, isPremium, page = 1, limit = 20 } = req.query;

    const query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (isPremium !== undefined) {
      query.isPremium = isPremium === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Prediction.countDocuments(query);

    const predictions = await Prediction.find(query)
      .sort({ kickoff: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name')
      .lean();

    res.json({
      predictions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('List predictions error:', err);
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
}

export async function getPrediction(req, res) {
  try {
    const prediction = await Prediction.findById(req.params.id)
      .populate('createdBy', 'name')
      .lean();

    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }

    res.json({ prediction });
  } catch (err) {
    console.error('Get prediction error:', err);
    res.status(500).json({ error: 'Failed to fetch prediction' });
  }
}

export async function createPrediction(req, res) {
  try {
    const {
      matchName, league, category, prediction, odds,
      confidence, kickoff, isPremium, isFeatured, analysis,
    } = req.body;

    if (!matchName?.home || !matchName?.away || !league || !category || !prediction || !odds || confidence === undefined || !kickoff) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // sanitize inputs
    const safeMatchName = {
      home: sanitizeHtml(String(matchName.home || '')),
      away: sanitizeHtml(String(matchName.away || '')),
    };

    const newPrediction = await Prediction.create({
      matchName: safeMatchName,
      league: sanitizeHtml(String(league)),
      category: sanitizeHtml(String(category)),
      prediction: sanitizeHtml(String(prediction)),
      odds: sanitizeHtml(String(odds)),
      confidence: Number(confidence),
      kickoff: new Date(kickoff),
      isPremium: Boolean(isPremium),
      isFeatured: Boolean(isFeatured),
      analysis: sanitizeHtml(analysis || ''),
      createdBy: req.user.id,
    });

    res.status(201).json({ prediction: newPrediction });
  } catch (err) {
    console.error('Create prediction error:', err);
    res.status(500).json({ error: 'Failed to create prediction' });
  }
}

export async function updatePrediction(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    delete updates._id;
    delete updates.createdBy;
    delete updates.createdAt;

    // sanitize updates
    if (typeof updates.matchName === 'object') {
      updates.matchName = sanitizeObject(updates.matchName);
    }
    if (updates.league) updates.league = sanitizeHtml(String(updates.league));
    if (updates.category) updates.category = sanitizeHtml(String(updates.category));
    if (updates.prediction) updates.prediction = sanitizeHtml(String(updates.prediction));
    if (updates.odds) updates.odds = sanitizeHtml(String(updates.odds));
    if (updates.analysis) updates.analysis = sanitizeHtml(String(updates.analysis));
    if (updates.kickoff) {
      updates.kickoff = new Date(updates.kickoff);
    }

    const prediction = await Prediction.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }

    res.json({ prediction });
  } catch (err) {
    console.error('Update prediction error:', err);
    res.status(500).json({ error: 'Failed to update prediction' });
  }
}

export async function deletePrediction(req, res) {
  try {
    const prediction = await Prediction.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }

    res.json({ message: 'Prediction deleted successfully' });
  } catch (err) {
    console.error('Delete prediction error:', err);
    res.status(500).json({ error: 'Failed to delete prediction' });
  }
}

export async function updatePredictionResult(req, res) {
  try {
    const { id } = req.params;
    const { status, homeScore, awayScore } = req.body;

    const update = {
      status,
      'result.homeScore': homeScore,
      'result.awayScore': awayScore,
      'result.confirmedAt': new Date(),
      'result.confirmedBy': req.user.id,
    };

    const prediction = await Prediction.findByIdAndUpdate(id, update, { new: true });

    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }

    res.json({ prediction });
  } catch (err) {
    console.error('Update result error:', err);
    res.status(500).json({ error: 'Failed to update result' });
  }
}

export async function getPredictionStats(req, res) {
  try {
    const stats = await Prediction.aggregate([
      { $match: { status: { $in: ['won', 'lost'] } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          won: { $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] } },
          lost: { $sum: { $cond: [{ $eq: ['$status', 'lost'] }, 1, 0] } },
          avgConfidence: { $avg: '$confidence' },
        },
      },
    ]);

    const total = stats[0]?.total || 0;
    const won = stats[0]?.won || 0;

    res.json({
      stats: stats[0] || { total: 0, won: 0, lost: 0, avgConfidence: 0 },
      winRate: total > 0 ? Math.round((won / total) * 100) : 0,
    });
  } catch (err) {
    console.error('Prediction stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

export async function getFeaturedPrediction(req, res) {
  try {
    const prediction = await Prediction.findOne({
      isFeatured: true,
      isActive: true,
      kickoff: { $gte: new Date() },
    })
      .sort({ confidence: -1 })
      .populate('createdBy', 'name')
      .lean();

    res.json({ prediction });
  } catch (err) {
    console.error('Get featured error:', err);
    res.status(500).json({ error: 'Failed to fetch featured prediction' });
  }
}
