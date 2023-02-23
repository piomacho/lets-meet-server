import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { Op } from 'sequelize';
const path = require('path')
var hbs = require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");
import { responseError, responseSuccess } from '../../utils/responses';
import { v4 } from 'uuid';
import { isUsers, Users } from './model';
import { isString } from '../../utils/basicGuards';
import { UserDetails } from '../UserDetails/model';

const actionCodeSettings = {
    //TODO RENAME ENDPOINT
    // url: 'https://polisocialpolitics.page.link/test1',
    // iOS: {
    //     bundleId: 'co.allcapps.poli',
    // },
    // android: {
    //     packageName: 'com.poliapp',
    //     installApp: true,
    //   },
    // handleCodeInApp: true,
};

const handlebarOptions = {
    // viewEngine: {
    //   extName: ".handlebars",
    //   partialsDir: path.resolve('./src/emailTemplates'),
    //   defaultLayout: false,
    // },
    // viewPath: path.resolve('./src/emailTemplates'),
    // extName: ".handlebars",
  }

  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,// true for 465, false for other ports
    // auth: {
    //   user: 'support@polihq.com', 
    //   pass:  'decniqgnicuqacms',
    // },
   
  });

//   transporter.use('compile', hbs(handlebarOptions));

export const getUsersList = async (req: Request, res: Response) => {
    const pageSizeRaw = isString(req.query.pageSize) ? parseInt(req.query.pageSize) : 20;
    const pageRaw = isString(req.query.page) ? parseInt(req.query.page) : 0;
    const pageSize = isNaN(pageSizeRaw) ? 20 : pageSizeRaw > 20 ? 20 : pageSizeRaw;
    const page = isNaN(pageRaw) ? 0 : pageRaw;


    try {
        const users = await Users.findAll({
            offset: pageSize * page,
            limit: pageSize,
            order: [['email', 'ASC']]
        });
        const total = await Users.count();
        const data = {
            users: users,
            total: total
        }
        responseSuccess(res, data);
    } catch (err) {
        responseError(res, err.message, 'getUsersList');
    }
}

export const createUsersItem = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (isUsers(data)) {
            const users = await Users.create({
                ...data,
                id: v4()
            })
             responseSuccess(res, users);
        } else {
            responseError(res, 'decode', 'createUsersItem');
        }

    } catch (err) {

        responseError(res, err.message, 'createUsersItem');
    } 
}

interface FavouriteTopicType {
    topic: string;
    occurances: number;
}

export const getUsersItem = async (req: Request, res: Response) => {
    const id = req.body.id;
    const provider = req.params.provider;
    try {
        const users = await Users.findOne({
            where: { [provider]: id },
            include: [
                { model: UserDetails, as: 'user-details' },
                // { model: CommentVotes, as: 'comment_votes' }
            ]
          })


        responseSuccess(res, users);

    } catch (err) {
        responseError(res, err.message, 'getUsersItem');
    }
}

export const findUserByEmail = async (req: Request, res: Response) => {
    const emailQuery =  req.body.email;
    try {
        const users = await Users.findOne({
            where: { email: emailQuery },
            include: [
                // { model: Opinions, as: 'opinions' },
                // { model: CommentVotes, as: 'comment_votes' }
            ]
          })
        responseSuccess(res, users);

    } catch (err) {
        responseError(res, err.message, 'getUsersItem');
    }
}

export const updateUsersItem = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const users = await Users.update(data,{ where: { id } })
          responseSuccess(res, users);

    } catch (err) {
        responseError(res, err.message, 'updateUsersItem');
    }
}

export const sendVerificationLink = async (req: Request, res: Response) => {
    const email = req.body.email;
    try {
        // const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings)
        // let info = await transporter.sendMail({
        //     from: '"Poli Social Politics " <noreply@polihq.com>', // sender address
        //     to: email,
        //     replyTo: 'noreply',
        //     subject: `Verify your email for ${email} ✔`, // Subject line
        //     template: 'verifyEmail',
        //     context: { 
        //         link: link
        //     }
        // });
        // console.log("Message sent: %s", info.messageId);
        
    } catch(err) {
            console.error(err);
        }
};

export const sendResetPasswordLink = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
        // const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings)
        // let info = await transporter.sendMail({
        //     from: '"Poli Social Politics " <noreply@polihq.com>', // sender address
        //     to: email,
        //     replyTo: 'noreply',
        //     subject: `Reset your password for for ${email} ✔`, // Subject line
        //     template: 'resetEmail',
        //     context: { 
        //         link: link
        //     }
        // });
        // console.log("Message sent: %s", info.messageId);
        
    } catch(err) {
            console.error(err);
        }
};

export const deleteUsersItem = async (req: Request, res: Response) => {
    const db_id = req.params.id;
   

    const user = await Users.findOne({ where: { id: db_id } })

    const google_id = user.google_id;
    const firebase_id = user.firebase_id;
    const apple_id = user.apple_id;
 
    if(google_id !== null) {
        await admin.auth()
            .deleteUser(google_id);
    }
  
    if(apple_id !== null) {
        await admin.auth()
            .deleteUser(apple_id);
    }
    if(firebase_id !== null) {
        await admin.auth()
            .deleteUser(firebase_id);
    }
    
    try {
        const users = await Users.destroy({ where: { id: db_id } });
        responseSuccess(res, users);
    } catch (err) {
        responseError(res, err.message, 'deleteUsersItem');
    }
  
}

