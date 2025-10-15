'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vagas_Emprego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vagas_Emprego.belongsTo(models.cadastra_parceiros, { foreignKey: 'parceiro_id', as: 'ass_vagas_parceiro'})
      Vagas_Emprego.hasMany(models.Emprego_Nomad, { foreignKey: 'vaga_id', as: 'ass_vaga_emprego'})
    }
  }
  Vagas_Emprego.init({
    nome_vaga: DataTypes.STRING,
    descricao: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vagas_Emprego',
  });
  return Vagas_Emprego;
};