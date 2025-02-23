import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './routes/auth.js';
import * as UserController from './controllers/userController.js';
import checkAuth from './utils/checkAuth.js';
import activityRoutes from "./routes/activity.js";
import authRoutes from "./routes/auth.js";
import completeProfileRoutes from './routes/completeProfile.js';
import cors from 'cors';

// Подключение к базе данных
mongoose.connect('mongodb+srv://qkumax:pass@diplom.sjdof.mongodb.net/diploma?retryWrites=true&w=majority&appName=diplom')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error:', err));

const app = express();

// Настройки middlewares
app.use(cors());
app.use(express.json());

// Маршруты
app.use("/activity", activityRoutes);
app.use("/auth", authRoutes);
app.use('/auth', completeProfileRoutes);

app.post('/auth/login', UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// Запуск сервера
const PORT = 4444;
app.listen(PORT, (err) => {
    if (err) {
        return console.log('Ошибка при запуске сервера:', err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
