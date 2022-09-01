'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tweets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tweets.belongsTo(models.User, {foreignKey: 'userId'})
      tweets.hasMany(models.likes, {foreignKey: 'tweetId'})
      tweets.hasMany(models.comments, {foreignKey: 'tweetId'})
    }
  }
  tweets.init({
    userId: DataTypes.INTEGER,
    tweet: DataTypes.STRING,
    likeCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tweets',
  });
  return tweets;
};