'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const saltRounds = 10
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.tweets, { foreignKey: 'userId'})
      User.hasMany(models.likes, {foreignKey: 'userId'})
      User.hasMany(models.comments, {foreignKey: 'userId'})
    
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    user.password = hashedPassword;
  });
  return User;
};