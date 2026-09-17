import { Router } from 'express';
import { listMatches, getMatch, createOrIngestMatches } from '../controllers/matchController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listMatches);
router.get('/:id', getMatch);
router.post('/ingest', requireAuth, requireAdmin, createOrIngestMatches);

export default router;
