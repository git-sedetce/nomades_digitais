'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
      await queryInterface.addColumn('cadastra_parceiros', 'tipo_estabelecimento', {
        allowNull: true, 
        type: Sequelize.STRING });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cadastra_parceiros', 'tipo_estabelecimento');
     
  }
};
