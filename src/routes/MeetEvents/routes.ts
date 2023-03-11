import { Request, Response, Router } from 'express';
import {
    getMeetEvents,
    createMeetEvent,
    getMeetEvent,
    updateMeetEvent,
    deleteMeetEvent,
    fetchMeetEventsWithParams
} from './actions';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    getMeetEvents(req, res);
});

router.post('/', async (req: Request, res: Response) => {
    createMeetEvent(req, res);
});

router.post('/fetch', async (req: Request, res: Response) => {
    fetchMeetEventsWithParams(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    getMeetEvent(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    updateMeetEvent(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    deleteMeetEvent(req, res);
});

export default router;