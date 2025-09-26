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
    missao: DataTypes.STRING,
    proposito: DataTypes.STRING,
    historia: DataTypes.STRING,
    perfil: DataTypes.STRING,
    nivel_experiencia: DataTypes.STRING,
    idioma: DataTypes.STRING,
    regras_convivencia: DataTypes.STRING,
    nivel_participacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comunidade',
  });
  return Comunidade;
};