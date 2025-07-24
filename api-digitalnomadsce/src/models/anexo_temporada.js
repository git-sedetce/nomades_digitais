'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anexo_temporada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      anexo_temporada.belongsTo(models.TemporadaNomad, { foreignKey: 'temporada_id', as:'ass_anexo_temporada' })
    }
  }
  anexo_temporada.init({
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anexo_temporada',
  });
  return anexo_temporada;
};