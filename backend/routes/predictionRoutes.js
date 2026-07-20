import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  listPredictions,
  getPrediction,
  getFeaturedPrediction,
  getPredictionStats,
} from '../controllers/predictionController.js';

const router = Router();

router.get('/', listPredictions);
router.get('/featured', getFeaturedPrediction);
router.get('/stats', getPredictionStats);
router.get('/:id', getPrediction);

export default router;

