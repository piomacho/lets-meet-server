import { Response } from "express";

export const responseSuccess = (res: Response, data: unknown) => {
    res.status(200).json({
        type: 'success',
        data: data
    });
}

export const responseError = (res: Response, message: string, label: string) => {
    console.error(`error - ${label} - `, message);

    res.status(500).json({
        type: 'error',
        message: `${label} - ${message}`
    });
}

export const responseAuthError = (res: Response, message: string, label: string) => {
    console.error(`error - ${label} - `, message);

    res.status(403).json({
        type: 'error',
        message: `${label} - ${message}`
    });
}