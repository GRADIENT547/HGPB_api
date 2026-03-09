import PlayerController from "../controllers/playerController";
import { Router } from "express";

const router = Router();

router.post("/", PlayerController.newPlayer);
router.get("/:nickname", PlayerController.getPlayer);

export default router;