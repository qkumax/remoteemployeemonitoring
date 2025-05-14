import sequelize from '../config/database.js';
import User from './User.js';
import ActivityLog from './ActivityLog.js';
import UsedApp from './UsedApp.js';
import Screenshot from './Screenshot.js';

// Установка связей между моделями
User.hasMany(ActivityLog, { foreignKey: 'userId' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

const initDb = async () => {
  await sequelize.authenticate(); // Проверка соединения
  await sequelize.sync({ alter: true }); // Обновление таблиц
  console.log('✅ База данных подключена и синхронизирована');
};

export { sequelize, initDb, User, ActivityLog, UsedApp, Screenshot };
