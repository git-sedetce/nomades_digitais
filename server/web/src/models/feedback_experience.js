'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedBack_Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeedBack_Experience.belongsTo(models.User, { foreignKey: 'user_id', as: 'ass_feedback_user' });
      FeedBack_Experience.belongsTo(models.Experience, { foreignKey: 'experience_id', as: 'ass_feedback_experience' });
    }
  }
  FeedBack_Experience.init({
    star: DataTypes.INTEGER,
    comentarios: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FeedBack_Experience',
  });
  return FeedBack_Experience;
};