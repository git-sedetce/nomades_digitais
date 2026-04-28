'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anexo_experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      anexo_experience.belongsTo(models.Experience, { foreignKey: 'experience_id', as: 'ass_anexos_experience' });
    }
  }
  anexo_experience.init({
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anexo_experience',
  });
  return anexo_experience;
};