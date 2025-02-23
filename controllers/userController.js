import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

// Регистрация
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new UserModel({
            email,
            passwordHash: hash,
            profileCompleted: false,
        });

        await user.save();

        const token = jwt.sign({ _id: user._id }, "secret123", { expiresIn: "30d" });

        res.json({ message: "Пользователь зарегистрирован!", token, profileCompleted: user.profileCompleted });
    } catch (err) {
        console.error("Ошибка регистрации:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// Вход
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "Неверный логин или пароль" });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({ message: "Неверный логин или пароль" });
        }

        const token = jwt.sign({ _id: user._id }, "secret123", { expiresIn: "30d" });

        res.json({ message: "Успешный вход!", token, profileCompleted: user.profileCompleted });
    } catch (err) {
        console.error("Ошибка входа:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// Завершение профиля
export const completeProfile = async (req, res) => {
    try {
        const { fullName, position } = req.body;

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        user.fullName = fullName;
        user.position = position;
        user.profileCompleted = true;
        await user.save();

        res.json({ message: "Профиль успешно заполнен" });
    } catch (err) {
        console.error("Ошибка при заполнении профиля:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }   
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    } catch (err) {
        console.error("Ошибка при получении пользователя:", err);
        res.status(500).json({ message: "Нет доступа" });
    }
};

