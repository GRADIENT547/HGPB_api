"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playerController_1 = __importDefault(require("../controllers/playerController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", playerController_1.default.newPlayer);
router.get("/:nickname", playerController_1.default.getPlayer);
exports.default = router;
//# sourceMappingURL=player.js.map