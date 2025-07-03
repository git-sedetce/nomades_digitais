'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Evento.belongsTo(models.Cidades, { foreignKey: 'city_id', as: 'ass_evento_municipio' })
      Evento.belongsTo(models.Regiao, { foreignKey: 'regiao_id', as: 'ass_evento_regiao' })
      Evento.hasMany(models.anexo_eventos, { foreignKey: 'evento_id', as: 'ass_evento_anexo' })
    }
  }
  Evento.init({
    evento_name: DataTypes.STRING,
    descricao: DataTypes.STRING,
    tipo_evento: DataTypes.STRING,
    data_inicio_evento: DataTypes.DATEONLY,
    data_final_evento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};