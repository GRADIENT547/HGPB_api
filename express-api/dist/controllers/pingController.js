"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PingController {
    static pingGet(req, res) {
        console.log('Received ping request');
        const response = { status: 200, message: 'get pong' };
        return res.json(response);
    }
    static pingGetError(req, res) {
        console.log('Received ping request');
        const response = { status: 500, message: 'get pong error' };
        return res.json(response);
    }
    static pingPost(req, res) {
        console.log('Received ping request');
        const response = { status: 200, message: 'post pong' };
        return res.json(response);
    }
}
exports.default = PingController;
//# sourceMappingURL=pingController.js.map