'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemporadaNomad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TemporadaNomad.belongsTo(models.Cidades, { foreignKey: 'cidade_id', as:'ass_temporada_cidade'})
      TemporadaNomad.hasMany(models.anexo_temporada, { foreignKey: 'temporada_id', as:'ass_anexo_temporada'})
    }
  }
  TemporadaNomad.init({
    nome_evento: DataTypes.STRING,
    data_evento: DataTypes.DATEONLY,
    horario: DataTypes.STRING,
    tipo_evento: DataTypes.STRING,
    descricao: DataTypes.STRING(5000),
    local: DataTypes.STRING,
    endereco: DataTypes.STRING    
  }, {
    sequelize,
    modelName: 'TemporadaNomad',
  });
  return TemporadaNomad;
};