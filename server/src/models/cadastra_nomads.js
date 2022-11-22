'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cadastra_nomads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cadastra_nomads.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nomad_email: DataTypes.STRING,
    contato_nomad: DataTypes.STRING,
    cidade: DataTypes.STRING,
    regiao: DataTypes.STRING,
    country: DataTypes.STRING,
    departure_date: DataTypes.DATE,
    shared_info: DataTypes.STRING,
    nomads_news: DataTypes.STRING,
    suggestion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cadastra_nomads',
  });
  return cadastra_nomads;
};