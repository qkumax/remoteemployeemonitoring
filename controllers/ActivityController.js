import ActivityLog from "../models/ActivityLog.js";

export const startSession = async (req, res) => {
    try {
        const newActivity = new ActivityLog({
            userId: req.userId,
            startTime: new Date(),
            keyboardActivity: 0,
            mouseActivity: 0,
            usedApps: [],
            screenshots: []
        });

        await newActivity.save();

        res.status(201).json({ message: "Сессия работы начата", activityId: newActivity._id });
    } catch (err) {
        console.error("Ошибка при запуске сессии:", err);
        res.status(500).json({ message: "Ошибка при запуске сессии" });
    }
};

export const endSession = async (req, res) => {
    try {
        console.log("🔍 Данные, полученные на сервере:", req.body);

        const { activityId, keyboardActivity, mouseActivity, usedApps, screenshots } = req.body;

        if (!activityId) {
            return res.status(400).json({ message: "Ошибка: activityId обязателен" });
        }

        const updatedActivity = await ActivityLog.findByIdAndUpdate(
            activityId,
            {
                endTime: new Date(),
                duration: Math.round((Date.now() - new Date(activityId.startTime)) / 60000),
                keyboardActivity: keyboardActivity ?? 0,
                mouseActivity: mouseActivity ?? 0,
                usedApps: usedApps ?? [],
                screenshots: screenshots ?? []
            },
            { new: true } // ✅ Вернуть обновлённый документ
        );

        if (!updatedActivity) {
            return res.status(404).json({ message: "Ошибка: Сессия не найдена" });
        }

        console.log("✅ Обновлённые данные перед сохранением:", updatedActivity);

        res.json({
            message: "Сессия завершена",
            activity: updatedActivity
        });
    } catch (err) {
        console.error("❌ Ошибка при завершении сессии:", err);
        res.status(500).json({ message: "Ошибка при завершении сессии" });
    }
};




export const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({ userId: req.userId }).sort({ startTime: -1 });

        res.json(logs);
    } catch (err) {
        console.error("Ошибка при получении логов:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};


export const getUserActivity = async (req, res) => {
    try {
        const logs = await ActivityLog.find({ userId: req.userId }).sort({ startTime: -1 });

        res.json(logs);
    } catch (err) {
        console.error("Ошибка при получении активности пользователя:", err);
        res.status(500).json({ message: "Ошибка при получении активности" });
    }
};
