'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
      await queryInterface.addColumn('Cidades', 'cod_ibge', {
        allowNull: true, 
        type: Sequelize.STRING });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cidades', 'cod_ibge');
     
  }
};
