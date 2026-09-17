import Match from '../models/Match.js';
import footballDataService from '../services/footballData.js';

export async function listMatches(req, res) {
  try {
    const { league, status, limit = 50 } = req.query;
    const query = {};
    if (league) query.league = league;
    if (status) query.status = status;

    const matches = await Match.find(query).sort({ kickoff: 1 }).limit(parseInt(limit)).lean();
    res.json({ matches, count: matches.length });
  } catch (err) {
    console.error('List matches error:', err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
}

export async function getMatch(req, res) {
  try {
    const match = await Match.findById(req.params.id).lean();
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json({ match });
  } catch (err) {
    console.error('Get match error:', err);
    res.status(500).json({ error: 'Failed to retrieve match details' });
  }
}

export async function createOrIngestMatches(req, res) {
  try {
    const { league = 'Premier League' } = req.body;
    const fixtures = await footballDataService.getUpcomingMatches(league);

    const ingested = [];
    for (const fixture of fixtures) {
      const match = await Match.findOneAndUpdate(
        { externalId: fixture.externalId },
        fixture,
        { upsert: true, new: true }
      );
      ingested.push(match);
    }

    res.json({ message: 'Ingestion completed', count: ingested.length, matches: ingested });
  } catch (err) {
    console.error('Ingest matches error:', err);
    res.status(500).json({ error: 'Failed to ingest matches' });
  }
}
