'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tipo_Experience.hasMany(models.Experience, { foreignKey: 'experience_type_id', as: 'ass_type_experience' });
    }
  }
  Tipo_Experience.init({
    tipo_experience: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo_Experience',
  });
  return Tipo_Experience;
};