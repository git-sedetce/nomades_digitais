'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anexos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      anexos.belongsTo(models.cadastra_parceiros, { foreignKey: 'user_id'})
    }
  }
  anexos.init({
    mimetype: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    tipo_anexo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anexos',
  });
  return anexos;
};