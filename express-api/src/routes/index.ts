import pingRoutes from './ping';
import PlayerRoutes from './player';
import RollRoutes from './roll';
import { Router } from 'express';

const router = Router();

router.use('/ping', pingRoutes);
router.use('/player', PlayerRoutes);
router.use('/roll', RollRoutes);

export default router;