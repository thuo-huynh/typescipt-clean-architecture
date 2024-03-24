import TranslateController from '@/controllers/TranslateController';
import { Router } from 'express';

const router = Router();

router.post('/translate', TranslateController.translate);
router.get('/histories', TranslateController.history);

export default router;
