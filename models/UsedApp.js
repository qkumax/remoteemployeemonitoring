import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ActivityLog from './ActivityLog.js';

const UsedApp = sequelize.define('UsedApp', {
  name: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false } // в секундах или минутах
});

ActivityLog.hasMany(UsedApp, { foreignKey: 'activityLogId', onDelete: 'CASCADE' });
UsedApp.belongsTo(ActivityLog, { foreignKey: 'activityLogId' });

export default UsedApp;
