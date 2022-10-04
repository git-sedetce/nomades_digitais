'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anexo_municipio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      anexo_municipio.belongsTo(models.cadastra_municipios, { foreignKey: 'municipio_id' })
    }
  }
  anexo_municipio.init({
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anexo_municipio',
  });
  return anexo_municipio;
};