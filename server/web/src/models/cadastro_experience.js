'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cadastro_experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cadastro_experience.belongsTo(models.Experience, { foreignKey: 'experience_id', as: 'ass_cadastro_experience' });
      cadastro_experience.belongsTo(models.User, { foreignKey: 'user_id', as: 'ass_cadastro_user' });

    }
  }
  cadastro_experience.init({
    confirmacao_presenca: DataTypes.BOOLEAN,
    ciente_pagamento: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'cadastro_experience',
  });
  return cadastro_experience;
};