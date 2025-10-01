'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comunidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING.STRING(500)
      },
      historia: {
        type: Sequelize.STRING.STRING(500)
      },
      data_criacao: {
        type: Sequelize.DATE
      },
      idioma: {
        type: Sequelize.STRING
      },
      regras_convivencia: {
        type: Sequelize.STRING.STRING(500)
      },
      gestor_comunidade: {
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
    await queryInterface.dropTable('Comunidades');
  }
};