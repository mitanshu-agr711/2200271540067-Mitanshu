import { Router } from 'express';
import { calculateAverage } from '../controller/average.controller.js';

const router = Router();
router.post('/calculate-average', calculateAverage);
export default router;
