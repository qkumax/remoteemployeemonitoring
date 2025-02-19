import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './routes/auth.js';
import { validationResult } from 'express-validator';
import * as UserController from './controllers/userController.js'
import User from './models/User.js';
import checkAuth from './utils/checkAuth.js';
import activityRoutes from "./routes/activity.js";
import authRoutes from "./routes/auth.js";
import cors from 'cors';


mongoose.connect('mongodb+srv://qkumax:pass@diplom.sjdof.mongodb.net/diploma?retryWrites=true&w=majority&appName=diplom',)
.then(() =>console.log('DB ok'))
.catch((err) =>console.log('DB error', err)); // подключение к дб

const app=express();


app.use(cors());

app.use(express.json());
 
app.use("/activity", activityRoutes);

app.post('/auth/login',UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.use("/auth", authRoutes);

app.get('/auth/me',checkAuth,UserController.getMe);
 
app.listen(4444,(err) => {
if(err){
    return console.log(err);
}

console.log('Server is OK');

});