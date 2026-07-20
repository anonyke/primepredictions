import { Router } from 'express';
import { listPredictions } from '../controllers/predictionController.js';

const router = Router();

router.get('/', listPredictions);

export default router;

