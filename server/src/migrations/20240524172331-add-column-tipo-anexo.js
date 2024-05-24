'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('anexos', 'tipo_anexo',{
      type: Sequelize.STRING(15),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('anexos', 'tipo_anexo');    
  }
};
