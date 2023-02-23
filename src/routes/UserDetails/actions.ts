import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../utils/responses';
import { v4 } from 'uuid';
import { isUserInfo, UserDetails } from './model';


export const createUserInfoItem = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (isUserInfo(data)) {
            const users = await UserDetails.create({
                ...data,
                id: v4()
            })
             responseSuccess(res, users);
        } else {
            responseError(res, 'decode', 'createUsersDetailsItem');
        }

    } catch (err) {
        responseError(res, err.message, 'createUsersDetailsItem');
    } 
}
