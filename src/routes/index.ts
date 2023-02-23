import { Router } from 'express';
import MeetEventsRoutes from './MeetEvents/routes';
import UsersRoutes from './Users/routes';
import UserInfoRoutes from './UserDetails/routes';


const router = Router();

router.use('/meetEvents', MeetEventsRoutes);
router.use('/users', UsersRoutes);
router.use('/user-info', UserInfoRoutes);

export default router;