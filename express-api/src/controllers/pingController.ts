import { Request, Response } from 'express';

interface PingResponse {
    status: number;
    message: string;
}

class  PingController {

    public static pingGet(req: Request, res: Response): Response {
        console.log('Received ping request');
        const response: PingResponse = { status: 200, message: 'get pong' };
        return res.json(response);
    }

    public static pingGetError(req: Request, res: Response): Response {
        console.log('Received ping request');
        const response: PingResponse = { status: 500, message: 'get pong error' };
        return res.json(response);
    }

    public static pingPost(req: Request, res: Response): Response {
        console.log('Received ping request');
        const response: PingResponse = { status: 200, message: 'post pong' };
        return res.json(response);
    }
}

export default PingController;