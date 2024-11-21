'use strict';

module.exports = {  
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cadastra_nomads', 'possui_empresa',{
      type: Sequelize.STRING(5),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cadastra_nomads', 'possui_empresa');    
  }
};
