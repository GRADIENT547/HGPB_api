"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
const express = require('express');
const client = require('prom-client');
const app = express();
// Включаем стандартные метрики Node.js
client.collectDefaultMetrics({ prefix: 'my_app_' });
// Создаём свои метрики для Express
const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});
app.use(express.json());
app.use(routes_1.default);
// Middleware для сбора метрик
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        const route = req.route?.path || req.path;
        httpRequestsTotal.inc({
            method: req.method,
            route: route,
            status_code: res.statusCode
        });
        httpRequestDuration.observe({
            method: req.method,
            route: route,
            status_code: res.statusCode
        }, duration);
    });
    next();
});
// Метрики endpoint
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        const metrics = await client.register.metrics();
        res.end(metrics);
    }
    catch (err) {
        res.status(500).end(err.message);
    }
});
// Тестовые маршруты
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});
app.get('/slow', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'This was slow' });
    }, 1000);
});
exports.default = app;
//# sourceMappingURL=app.js.map