"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ping_1 = __importDefault(require("./ping"));
const player_1 = __importDefault(require("./player"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/ping', ping_1.default);
router.use('/player', player_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map