'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cidades.belongsTo(models.Regiao, { foreignKey: 'regiao_id', as: 'ass_municipio_regiao' })
      Cidades.hasMany(models.Evento, { foreignKey: 'city_id', as: 'ass_municipio_evento' })
      Cidades.hasMany(models.TemporadaNomad, { foreignKey: 'cidade_id', as: 'ass_municipio_temporada' })
      Cidades.hasMany(models.cadastra_municipios, { foreignKey: 'cidade', as: 'ass_cidades_cadastra_municipio' })
      Cidades.hasMany(models.anexo_municipio, { foreignKey: 'municipio_id', as: 'ass_cidades_anexo_municipio' })
    }
  }
  Cidades.init({
    nome_municipio: DataTypes.STRING,
    cod_ibge: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cidades',
    //paranoid: true,
  });
  return Cidades;
};