'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comunidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comunidade.hasMany(models.EncontrosComunidade, { foreignKey: 'comunidade_id', as: 'ass_comunity_meet' })     
      Comunidade.hasMany(models.ConectComunidade, { foreignKey: 'comunidade_id', as: 'ass_comunity_conect' })
      Comunidade.hasMany(models.Evento, { foreignKey: 'comunidade_id', as: 'ass_comunity_evento' })
    }
  }
  Comunidade.init({
    name: DataTypes.STRING,
    descricao: DataTypes.STRING,
    historia: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    idioma: DataTypes.STRING,
    regras_convivencia: DataTypes.STRING,
    gestor_comunidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comunidade',
  });
  return Comunidade;
};