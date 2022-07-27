'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cadastra_municipios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cadastra_municipios.init({
    cidade: DataTypes.STRING,
    regiao: DataTypes.STRING,
    email_prefeitura: DataTypes.STRING,
    contato_prefeitura: DataTypes.STRING,
    link_prefeitura: DataTypes.STRING,
    historia_cidade: DataTypes.STRING,
    wifi_service: DataTypes.STRING,
    wifi_cidade: DataTypes.STRING,
    service_estrangeiro: DataTypes.STRING,
    service_cidade: DataTypes.STRING,
    service_empresario: DataTypes.STRING,
    service_seguranca: DataTypes.STRING,
    pontos_turisticos: DataTypes.STRING,
    espacos_culturais: DataTypes.STRING,
    espacos_lazer: DataTypes.STRING,
    tipo_turismo: DataTypes.STRING,
    rota: DataTypes.STRING,
    qual_rota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cadastra_municipios',
  });
  return cadastra_municipios;
};