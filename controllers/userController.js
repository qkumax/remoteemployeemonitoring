import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { User } from "../models/index.js";

// Регистрация
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      passwordHash: hash,
      profileCompleted: false
    });

    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN); // отладка
    const token = jwt.sign({ id: newUser.id },process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({
      message: "Пользователь зарегистрирован!",
      token,
      profileCompleted: newUser.profileCompleted
    });
  } catch (err) {
    console.error("Ошибка регистрации:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Вход
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ message: "Неверный логин или пароль" });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN); // отладка
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    const { passwordHash, ...userData } = user.dataValues;

    res.json({
      message: "Успешный вход!",
      token,
      profileCompleted: user.profileCompleted,
      user: userData
    });
  } catch (err) {
    console.error("Ошибка входа:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Завершение профиля
export const completeProfile = async (req, res) => {
  try {
    const { fullName, position } = req.body;

    const user = await User.findByPk(req.userId);
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

// Получение себя
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const { passwordHash, ...userData } = user.dataValues;
    res.json(userData);
  } catch (err) {
    console.error("Ошибка при получении пользователя:", err);
    res.status(500).json({ message: "Нет доступа" });
  }
};