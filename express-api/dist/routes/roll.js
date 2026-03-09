"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollController_1 = __importDefault(require("../controllers/rollController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", rollController_1.default.Roll);
exports.default = router;
//# sourceMappingURL=roll.js.map