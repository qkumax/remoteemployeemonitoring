import { ActivityLog, UsedApp, Screenshot } from "../models/index.js";
import { generateActivityPdf } from '../utils/pdfGenerator.js';
import { Op } from "sequelize";


// 🚀 Начать сессию
export const startSession = async (req, res) => {
  try {
    const newActivity = await ActivityLog.create({
      userId: req.userId,
      startTime: new Date(),
      keyboardActivity: 0,
      mouseActivity: 0,
      isIdle: false,
      idleDuration: 0
    });

    res.status(201).json({ message: "Сессия работы начата", activityId: newActivity.id });
  } catch (err) {
    console.error("Ошибка при запуске сессии:", err);
    res.status(500).json({ message: "Ошибка при запуске сессии" });
  }
};

// ✅ Завершить сессию + сохранить usedApps и screenshots
export const endSession = async (req, res) => {
  try {
    const {
      activityId,
      keyboardActivity,
      mouseActivity,
      isIdle,
      idleDuration,
      usedApps,
      screenshots
    } = req.body;

    if (!activityId) {
      return res.status(400).json({ message: "activityId обязателен" });
    }

    const activity = await ActivityLog.findByPk(activityId);

    if (!activity || activity.userId !== req.userId) {
      return res.status(404).json({ message: "Сессия не найдена" });
    }

    activity.endTime = new Date();
    activity.keyboardActivity = keyboardActivity ?? activity.keyboardActivity;
    activity.mouseActivity = mouseActivity ?? activity.mouseActivity;
    activity.isIdle = isIdle ?? activity.isIdle;
    activity.idleDuration = idleDuration ?? activity.idleDuration;

    await activity.save();

    // Удалим старые usedApps и screenshots
    await UsedApp.destroy({ where: { activityLogId: activity.id } });
    await Screenshot.destroy({ where: { activityLogId: activity.id } });

    // Сохраняем usedApps
    if (Array.isArray(usedApps)) {
      await Promise.all(
        usedApps.map(app =>
          UsedApp.create({
            name: app.name,
            duration: app.duration,
            activityLogId: activity.id
          })
        )
      );
    }

    // Сохраняем screenshots
    if (Array.isArray(screenshots)) {
      await Promise.all(
        screenshots.map(shot =>
          Screenshot.create({
            url: shot.url,
            timestamp: shot.timestamp,
            activityLogId: activity.id
          })
        )
      );
    }

    res.json({ message: "Сессия завершена и данные сохранены", activityId: activity.id });
  } catch (err) {
    console.error("Ошибка при завершении сессии:", err);
    res.status(500).json({ message: "Ошибка при завершении сессии" });
  }
};

// 📄 Получить все логи активности пользователя
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.findAll({
      where: { userId: req.userId },
      order: [["startTime", "DESC"]],
      include: [UsedApp, Screenshot]
    });

    res.json(logs);
  } catch (err) {
    console.error("Ошибка при получении логов:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// 📅 Получить активность за текущий день
export const getTodayActivity = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logs = await ActivityLog.findAll({
      where: {
        userId: req.userId,
        startTime: { [Op.gte]: today }
      },
      order: [["startTime", "DESC"]],
      include: [UsedApp, Screenshot]
    });

    res.json(logs);
  } catch (err) {
    console.error("Ошибка при получении активности за день:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


// 📥 Скачать PDF по активности
export const downloadActivityPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await ActivityLog.findOne({
      where: { id, userId: req.userId },
      include: [UsedApp, Screenshot]
    });

    if (!activity) {
      return res.status(404).json({ message: "Сессия не найдена" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=activity_${id}.pdf`);

    generateActivityPdf(activity, activity.UsedApps, activity.Screenshots, res);
  } catch (err) {
    console.error("Ошибка при создании PDF:", err);
    res.status(500).json({ message: "Ошибка сервера при генерации PDF" });
  }
};

