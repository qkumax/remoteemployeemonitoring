import express from 'express';
import { User } from '../models/index.js'; // ✅ Sequelize User
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.post('/complete-profile', checkAuth, async (req, res) => {
  try {
    const { fullName, position } = req.body;

    const user = await User.findByPk(req.userId); // ✅ Sequelize-style

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.fullName = fullName;
    user.position = position;
    user.profileCompleted = true;
    await user.save();

    res.json({ message: 'Профиль успешно обновлён', user });
  } catch (err) {
    console.error(err); // 🔧 исправлено: console.err → console.error
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
