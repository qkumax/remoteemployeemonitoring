import { body } from "express-validator";
import express from "express";
import * as UserController from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.get("/me", checkAuth, UserController.getMe);
export const registerValidation = [
    body("email", "Некорректный формат почты").isEmail(),
    body("password", "Пароль должен быть минимум 6 символов").isLength({ min: 6 }),
    body("fullName", "Имя обязательно").isLength({ min: 3 }),
    body("avatarURl", "Некорректный URL").optional().isURL(),
];

export default router;