import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(5000, '0.0.0.0', () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
  console.log(`📊 Метрики: http://localhost:${PORT}/metrics`);
  console.log(`👥 Пинг: http://localhost:${PORT}/ping`);
});