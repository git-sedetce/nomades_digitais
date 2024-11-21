'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class municipio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  municipio.init({
    cidade: DataTypes.STRING,
    regiao: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    link: DataTypes.STRING,
    historia: DataTypes.STRING,
    wifi: DataTypes.BOOLEAN,
    local_wifi: DataTypes.STRING,
    servico: DataTypes.STRING,
    manager_service: DataTypes.STRING,
    seguranca: DataTypes.STRING,
    pontos_turisticos: DataTypes.STRING,
    espaco_cultural: DataTypes.STRING,
    espaco_lazer: DataTypes.STRING,
    tipo_turismo: DataTypes.STRING,
    rota: DataTypes.BOOLEAN,
    qual: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'municipio',
  });
  return municipio;
};