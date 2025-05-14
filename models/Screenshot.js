import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ActivityLog from './ActivityLog.js';

const Screenshot = sequelize.define('Screenshot', {
  url: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false }
});

ActivityLog.hasMany(Screenshot, { foreignKey: 'activityLogId', onDelete: 'CASCADE' });
Screenshot.belongsTo(ActivityLog, { foreignKey: 'activityLogId' });

export default Screenshot;
