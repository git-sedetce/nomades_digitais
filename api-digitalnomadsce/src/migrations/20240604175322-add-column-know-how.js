'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cadastra_nomads', 'know_how',{
      type: Sequelize.STRING(100),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cadastra_nomads', 'know_how');    
  }
};
