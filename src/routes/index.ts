import { Router } from 'express';
import TranslateRouter from '@/routes/TranslateRouter';

const router = Router();

router.use('/', TranslateRouter);

export default router;
