import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
// import * as admin from 'firebase-admin';

import BaseRouter from './routes/index';
import { initDatabase } from "./database";
import { makeRelations } from "./database/relations";

const init = async () => {
    dotenv.config();

    await initDatabase();
    makeRelations();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use('/', express.static(path.join(__dirname, 'static')))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(cors())
    app.use('/api', BaseRouter);

    // admin.initializeApp({
    //     credential: admin.credential.cert(JSON.parse(process.env.FIREBESE_CREDENTIALS)),
    // });

    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
    });
}

init();
