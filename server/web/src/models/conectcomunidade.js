'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConectComunidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ConectComunidade.belongsTo(models.Comunidade, { foreignKey: 'comunidade_id', as: 'ass_conect_comunity' })
    }
  }
  ConectComunidade.init({
    plataforma: DataTypes.STRING,
    acesso_midia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ConectComunidade',
  });
  return ConectComunidade;
};