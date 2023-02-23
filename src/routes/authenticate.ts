import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import { responseAuthError } from '../utils/responses';
import { isValidToken } from './Users/model';

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];
	//for now
	next();
 	//  if (!isValidToken(token))
    // 	return responseAuthError(res, 'Token is missing', 'Missing token for verification')
    
	// try {
	// 	await admin.auth().verifyIdToken(token);
	// 	next();
	// } catch(err) {
	// 	console.log("err ", err)
	// 	return responseAuthError(res, 'Token is invalid', 'Token is invalid')
	// }
}