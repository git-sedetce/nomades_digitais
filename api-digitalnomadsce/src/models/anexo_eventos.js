'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anexo_eventos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      anexo_eventos.belongsTo(models.Evento, { foreignKey: 'evento_id', as: 'ass_anexo_evento' })
    }
  }
  anexo_eventos.init({
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    tipo_anexo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anexo_eventos',
  });
  return anexo_eventos;
};