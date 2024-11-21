'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
      await queryInterface.addColumn('cadastra_nomads', 'deletedAt', {
        allowNull: true, 
        type: Sequelize.STRING });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cadastra_nomads', 'deletedAt');
     
  }
};
