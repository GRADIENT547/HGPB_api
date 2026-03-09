import { Request, Response } from "express";
declare class PlayerController {
    static getPlayer(req: Request, res: Response): Promise<Response>;
    static newPlayer(req: Request, res: Response): Promise<Response>;
}
export default PlayerController;
//# sourceMappingURL=playerController.d.ts.map