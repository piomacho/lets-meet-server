import { Request, Response, Router } from 'express';
import {verifyToken} from '../authenticate';
import {
    createUsersItem,
    deleteUsersItem,
    getUsersItem,
    getUsersList,
    updateUsersItem, 
    findUserByEmail,
    sendVerificationLink,
    sendResetPasswordLink,
} from './actions';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    getUsersList(req, res);
});

router.post('/', async (req: Request, res: Response) => {
    createUsersItem(req, res);
});

router.post('/id-provider/:provider', verifyToken, async (req: Request, res: Response) => {
    getUsersItem(req, res);
});
router.post('/email/', verifyToken, async (req: Request, res: Response) => {

    findUserByEmail(req, res);
});

router.post('/verify', verifyToken, async (req: Request, res: Response) => {
    sendVerificationLink(req, res);
});

router.post('/reset', async (req: Request, res: Response) => {
    sendResetPasswordLink(req, res);
});

router.put('/:id', verifyToken, async (req: Request, res: Response) => {
    updateUsersItem(req, res);
});

router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    deleteUsersItem(req, res);
});

export default router;