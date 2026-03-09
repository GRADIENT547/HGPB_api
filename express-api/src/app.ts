import { Request, NextFunction, Response } from "express";
import routes from './routes';

const express = require('express');
const client = require('prom-client');

const app = express();

// Включаем стандартные метрики Node.js
client.collectDefaultMetrics({ prefix : 'my_app_' });

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
app.use(routes);

// Middleware для сбора метрик
app.use((req: Request, res: Response, next: NextFunction) => {
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
app.get('/metrics', async (req: Request, res: Response) => {
    try {
        res.set('Content-Type', client.register.contentType);
        const metrics = await client.register.metrics();
        res.end(metrics);
    } catch (err: any) {
        res.status(500).end(err.message);
    }
});

// Тестовые маршруты
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello World!' });
});

app.get('/users', (req: Request, res: Response) => {
    res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

app.get('/slow', (req: Request, res: Response) => {
    setTimeout(() => {
        res.json({ message: 'This was slow' });
    }, 1000);
});

export default app;