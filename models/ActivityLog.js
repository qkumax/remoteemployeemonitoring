import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const ActivityLog = sequelize.define('ActivityLog', {
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: true  },
  keyboardActivity: { type: DataTypes.INTEGER, defaultValue: 0 },
  mouseActivity: { type: DataTypes.INTEGER, defaultValue: 0 },
  isIdle: { type: DataTypes.BOOLEAN, defaultValue: false },
  idleDuration: { type: DataTypes.INTEGER, defaultValue: 0 }
});

User.hasMany(ActivityLog, { foreignKey: 'userId' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

export default ActivityLog;
