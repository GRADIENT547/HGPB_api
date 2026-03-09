import { Request, Response } from "express";
import PlayerService from "../services/PlayerService";
import slotMachine from "../models/SlotMachine";

class RollController {
    
    static async Roll(req: Request, res: Response): Promise<Response> {
        let { nickname, deposit } = req.body;
        deposit = Number(deposit);
        
        if (!nickname || typeof nickname !== "string") {
            return res.status(400).json({ error: "Nickname is required" });
        }

        if (isNaN(deposit) || deposit <= 0) {
            return res.status(400).json({ error: "Deposit must be a positive number" });
        }
        const player = new PlayerService();

        const result = await player.processBet(nickname, deposit);

        if (!result.success) {
            return res.status(400).json({ error: result.message });
        }

        const winnings: {combination: string[], win: number} = await slotMachine.spin(deposit);
        await player.addWinnings(nickname, winnings.win);

        try {
            return res.status(201).json({ message: "Roll executed successfully", result: winnings });
        } catch (error) {
            return res.status(500).json({ error: "Failed to execute roll" });
        }
    }
}

export default RollController;