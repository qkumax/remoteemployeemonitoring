import express from "express";
import * as ActivityController from "../controllers/ActivityController.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/start", checkAuth, ActivityController.startSession);
router.post("/end", checkAuth, ActivityController.endSession);
router.get("/logs", checkAuth, ActivityController.getActivityLogs);

export default router;
