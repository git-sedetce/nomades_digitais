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
      cadastra_nomads.hasMany( models.empresaNomade, { foreignKey: 'nomad_id', as: 'ass_nomade_empresa'})
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
    //departure_date: DataTypes.DATE,
    shared_info: DataTypes.STRING,
    nomads_news: DataTypes.STRING,
    suggestion: DataTypes.STRING,
    first_time_ce: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    passaporte: DataTypes.STRING,
    motivo_viagem: DataTypes.STRING,
    know_how: DataTypes.STRING,
    profissao: DataTypes.STRING,
    possui_empresa: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'cadastra_nomads',
  });
  return cadastra_nomads;
};