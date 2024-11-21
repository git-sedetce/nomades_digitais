'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class domains extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  domains.init({
    nome: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'domains',
  });
  return domains;
};