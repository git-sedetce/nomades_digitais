'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.hasMany(models.User, { foreignKey: 'profile_id', as: 'ass_profile_user' })
    }
  }
  Profile.init({
    perfil: DataTypes.STRING,
    is_master: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};