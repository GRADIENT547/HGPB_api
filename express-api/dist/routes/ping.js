"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pingController_1 = __importDefault(require("../controllers/pingController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/', pingController_1.default.pingGet);
router.use('/error', pingController_1.default.pingGetError);
router.use('/', pingController_1.default.pingPost);
exports.default = router;
//# sourceMappingURL=ping.js.map