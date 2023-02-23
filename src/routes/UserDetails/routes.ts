import { Request, Response, Router } from 'express';
import {verifyToken} from '../authenticate';
import {
    createUserInfoItem,
} from './actions';

const router = Router();


router.post('/', async (req: Request, res: Response) => {
    createUserInfoItem(req, res);
});

export default router;