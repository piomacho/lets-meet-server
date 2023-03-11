import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../utils/responses';
import { isFetchMeetEvents, isMeetEventsCreate, MeetEvents } from './model';
import { v4 } from 'uuid';

export const getMeetEvents = async (_req: Request, res: Response) => {
    try {
        const meetEvents = await MeetEvents.findAll();
        responseSuccess(res, meetEvents);
    } catch (err) {
        responseError(res, err.message, 'getMeetEvents');
    }
}

export const createMeetEvent = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (isMeetEventsCreate(data)) {
            const meetEvent = await MeetEvents.create({
                ...data,
                id: v4()
            })
            responseSuccess(res, meetEvent);
        } else {
            responseError(res, 'decode', 'createMeetEvent');
        }

    } catch (err) {
        responseError(res, err.message, 'createMeetEvent');
    }
}

export const fetchMeetEventsWithParams = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (isFetchMeetEvents(data)) {
            if (data.category === null && data.gender === null) {
                const meetEvents = await MeetEvents.findAll();
                responseSuccess(res, meetEvents);
            } else if(data.category === null && data.gender !== null) {
                const meetEvent = await MeetEvents.findAll({
                     where: {
                        gender: data.gender
                  }})
                responseSuccess(res, meetEvent);
            } else if(data.category !== null && data.gender === null) {
                const meetEvent = await MeetEvents.findAll({
                     where: {
                        category: data.category
                  }})
                responseSuccess(res, meetEvent);
            } else {
                const meetEvent = await MeetEvents.findAll({
                     where: {
                        category: data.category,
                        gender: data.gender
                  }})
                responseSuccess(res, meetEvent);
            }
            
        } else {
            responseError(res, 'decode', 'fetchMeetEventsWithParams');
        }

    } catch (err) {
        responseError(res, err.message, 'createMeetEvent');
    }
}

export const getMeetEvent = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const meetEvent = await MeetEvents.findOne({
            where: { id },
        })

        responseSuccess(res, meetEvent);
    } catch (err) {
        responseError(res, err.message, 'getMeetEvent');
    }
}

export const updateMeetEvent = async (req: Request, res: Response) => {

    const id = req.params.id;
    const data = req.body;

    try {
        const meetEvent = await MeetEvents.update(data, { where: { id } })
        responseSuccess(res, meetEvent);

    } catch (err) {
        responseError(res, err.message, 'updateMeetEvent');
    }
}

export const deleteMeetEvent = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const meetEvent = await MeetEvents.destroy({ where: { id: id } });
        responseSuccess(res, meetEvent);
    } catch (err) {
        responseError(res, err.message, 'deleteMeetEvent');
    }
}