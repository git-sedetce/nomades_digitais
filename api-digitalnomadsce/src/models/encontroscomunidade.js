'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EncontrosComunidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EncontrosComunidade.belongsTo(models.Comunidade, { foreignKey: 'comunidade_id', as: 'ass_meet_comunity' })
    }
  }
  EncontrosComunidade.init({
    lugar: DataTypes.STRING,
    formato: DataTypes.STRING,
    data_encontro: DataTypes.DATEONLY,
    hora: DataTypes.STRING,
    cep: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EncontrosComunidade',
  });
  return EncontrosComunidade;
};