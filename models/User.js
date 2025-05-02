
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true },
  passwordHash: DataTypes.STRING,
  fullName: DataTypes.STRING,
  position: DataTypes.STRING,
  profileCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default User;
