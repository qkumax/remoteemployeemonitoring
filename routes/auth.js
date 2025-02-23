import { body } from "express-validator";
import express from "express";
import * as UserController from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

export const registerValidation = [
    body("email", "Некорректный формат почты").isEmail(),
    body("password", "Пароль должен быть минимум 6 символов").isLength({ min: 6 }),
];

router.post("/register", registerValidation, UserController.register);

router.post("/complete-profile", checkAuth, UserController.completeProfile);

router.get("/me", checkAuth, UserController.getMe);

export default router;
