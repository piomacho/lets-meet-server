import { Router } from 'express';
import MeetEventsRoutes from './MeetEvents/routes';


const router = Router();

router.use('/meetEvents', MeetEventsRoutes);

export default router;