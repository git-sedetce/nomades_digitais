'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Experience.belongsTo(models.Tipo_Experience, { foreignKey: 'experience_type_id', as: 'ass_experience_type' });
      Experience.belongsTo(models.User, { foreignKey: 'user_id', as: 'ass_experiences_user' });
      Experience.hasMany(models.anexo_experience, { foreignKey: 'experience_id', as: 'ass_experience_anexos' });
      Experience.hasMany(models.FeedBack_Experience, { foreignKey: 'experience_id', as: 'ass_experiences_feedback' });
      Experience.belongsTo(models.Cidades, { foreignKey: 'cidade_id', as: 'ass_experiences_cidade' });
    }
  }
  Experience.init({
    titulo: DataTypes.STRING,
    local: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_experience: DataTypes.DATEONLY,
    horario_experience: DataTypes.TIME,
    valor: DataTypes.DOUBLE,
    qtde_vagas: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Experience',
  });
  return Experience;
};