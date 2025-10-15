'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprego_Nomad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Emprego_Nomad.belongsTo(models.User, { foreignKey: 'nomad_id', as: 'ass_vagas_nomad'})
      Emprego_Nomad.belongsTo(models.Vagas_Emprego, { foreignKey: 'vaga_id', as: 'ass_emprego_vaga'})
    }
  }
  Emprego_Nomad.init({
  }, {
    sequelize,
    modelName: 'Emprego_Nomad',
  });
  return Emprego_Nomad;
};