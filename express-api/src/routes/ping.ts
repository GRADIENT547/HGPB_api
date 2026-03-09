import PingController from '../controllers/pingController';
import { Router } from 'express';

const router = Router();

router.use('/', PingController.pingGet);
router.use('/error', PingController.pingGetError);
router.use('/', PingController.pingPost);

export default router;