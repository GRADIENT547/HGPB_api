import { Request, Response } from "express";
import PlayerService from "../services/PlayerService";

class PlayerController {

    static async getPlayer(req: Request, res: Response): Promise<Response> {
        const playerService = new PlayerService();

        try {
            if (!req.params || !req.params.nickname || typeof req.params.nickname !== "string") {
                return res.status(400).json({ error: "Nickname parameter is required" });
            }

            const result = await playerService.getPlayer(req.params.nickname);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Failed to retrieve player" });
        }
    }
    
    static async newPlayer(req: Request, res: Response): Promise<Response> {
        const { nickname } = req.body;
        const playerService = new PlayerService();

        try {

            if (!nickname || typeof nickname !== "string") {
                return res.status(400).json({ error: "Nickname is required" });
            }

            await playerService.createPlayer(nickname);
            return res.status(201).json({ message: `Player ${nickname} created successfully` });
        } catch (error) {
            return res.status(500).json({ error: "Failed to create player" });
        }
    }
}

export default PlayerController;