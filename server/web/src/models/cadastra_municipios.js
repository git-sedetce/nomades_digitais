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
      cadastra_municipios.hasMany(models.anexo_municipio, { foreignKey: 'municipio_id', as:'ass_city_anexo'})
      cadastra_municipios.belongsTo(models.Cidades, { foreignKey: 'cidade', as: 'ass_cadastra_municipios_cidade' })
      cadastra_municipios.belongsTo(models.Regiao, { foreignKey: 'regiao', as: 'ass_cadastra_municipios_regiao' })
    }
  }
  cadastra_municipios.init({
    cidade: DataTypes.STRING,
    regiao: DataTypes.STRING,
    email_prefeitura: DataTypes.STRING,
    contato_prefeitura: DataTypes.STRING,
    link_prefeitura: DataTypes.STRING,
    historia_cidade: DataTypes.STRING(500),
    wifi_service: DataTypes.STRING,
    wifi_cidade: DataTypes.STRING,
    service_estrangeiro: DataTypes.STRING,
    service_cidade: DataTypes.STRING(500),
    service_empresario: DataTypes.STRING(500),
    service_seguranca: DataTypes.STRING(500),
    pontos_turisticos: DataTypes.STRING(500),
    espacos_culturais: DataTypes.STRING(500),
    espacos_lazer: DataTypes.STRING(500),
    tipo_turismo: DataTypes.STRING,
    rota: DataTypes.STRING,
    qual_rota: DataTypes.STRING,
    tourism_ecologico: DataTypes.STRING,
    tourism_praiano: DataTypes.STRING(200),
    tourism_radical: DataTypes.STRING(200),
    tourism_religioso: DataTypes.STRING(200),
    tourism_serrano: DataTypes.STRING(200),
    tourism_sertanejo: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'cadastra_municipios',
  });
  return cadastra_municipios;
};