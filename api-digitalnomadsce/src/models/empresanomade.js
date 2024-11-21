'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresaNomade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      empresaNomade.belongsTo( models.cadastra_nomads, { foreignKey: 'nomad_id', as: 'ass_empresa_nomade'})
    }
  }
  empresaNomade.init({    
    nome_empresa: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    setor: DataTypes.STRING,
    site: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'empresaNomade',
  });
  return empresaNomade;
};