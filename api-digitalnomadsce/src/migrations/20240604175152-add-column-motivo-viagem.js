'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cadastra_nomads', 'motivo_viagem',{
      type: Sequelize.STRING(500),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cadastra_nomads', 'motivo_viagem');    
  }
};
