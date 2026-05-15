'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConectComunidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comunidade_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Comunidades', key: 'id' }
      },
      plataforma: {
        type: Sequelize.STRING
      },
      acesso_midia: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ConectComunidades');
  }
};