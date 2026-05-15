'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estabelecimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  estabelecimento.init({
    cnpj: DataTypes.STRING,
    nome: DataTypes.STRING,
    nome_fantasia: DataTypes.STRING,
    razao_social: DataTypes.STRING,
    cidade: DataTypes.STRING,
    telefone: DataTypes.STRING,
    redes_sociais: DataTypes.STRING,
    acesso_internet: DataTypes.BOOLEAN,
    velocidade_internet: DataTypes.STRING,
    servicos: DataTypes.STRING,
    reuniao: DataTypes.STRING,
    proposta: DataTypes.STRING,
    resumo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estabelecimento',
  });
  return estabelecimento;
};