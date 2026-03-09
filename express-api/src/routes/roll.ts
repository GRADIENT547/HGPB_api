import RollController from "../controllers/rollController";
import { Router } from "express";

const router = Router();

router.post("/", RollController.Roll);

export default router;