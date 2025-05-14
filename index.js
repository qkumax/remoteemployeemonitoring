import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDb } from './models/index.js'; // подключение к PostgreSQL через Sequelize
import { registerValidation } from './routes/auth.js';
import * as UserController from './controllers/userController.js';
import checkAuth from './utils/checkAuth.js';

import activityRoutes from "./routes/activity.js";
import authRoutes from "./routes/auth.js";
import completeProfileRoutes from './routes/completeProfile.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/activity", activityRoutes);
app.use("/auth", authRoutes);
app.use("/auth", completeProfileRoutes);

// Пользовательские ручки
app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

// Подключение React (build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.resolve(__dirname, 'client', 'build');

app.use(express.static(clientBuildPath));

// Отдача index.html на все остальные маршруты (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const PORT = 4444;

app.listen(PORT, async () => {
  try {
    await initDb(); // запуск Sequelize и синхронизация моделей
    console.log('✅ PostgreSQL: База данных подключена');
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
  } catch (err) {
    console.error('❌ Ошибка при запуске БД:', err);
  }
});
