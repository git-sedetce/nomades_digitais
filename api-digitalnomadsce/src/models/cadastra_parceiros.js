'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cadastra_parceiros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cadastra_parceiros.hasMany(models.anexos, { foreignKey: 'user_id', as: 'ass_imgsParceiros'})
    }
  }
  cadastra_parceiros.init({
    cnpj: DataTypes.STRING,
    nome_fantasia: DataTypes.STRING,
    razao_social: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cep: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    email_parceiro: DataTypes.STRING,
    midia_social: DataTypes.STRING,
    instagram_parceiro: DataTypes.STRING,
    tipo_service: DataTypes.STRING,
    tipo_estabelecimento: DataTypes.STRING,
    tipo_estabelecimento_outros: DataTypes.STRING,
    essential_service: DataTypes.STRING(500),
    internet_speed: DataTypes.STRING,
    internet_service: DataTypes.STRING,
    outro_servico: DataTypes.STRING(500),
    trabalho_reunioes: DataTypes.STRING,
    tarifa_especial: DataTypes.STRING(500),
    internet_service_alimentacao: DataTypes.STRING,
    orienta_equipe: DataTypes.STRING,
    localizacao: DataTypes.STRING,
    ramo: DataTypes.STRING,
    beneficios: DataTypes.STRING(500),
    espacos_culturais: DataTypes.STRING(500),
    idioma: DataTypes.STRING,
    qual_idioma: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cadastra_parceiros',
  });
  return cadastra_parceiros;
};