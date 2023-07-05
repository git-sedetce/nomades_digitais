'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
      await queryInterface.addColumn('cadastra_nomads', 'data_nascimento', {
        allowNull: true, 
        type: Sequelize.DATE });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cadastra_nomads', 'data_nascimento');
     
  }
};
