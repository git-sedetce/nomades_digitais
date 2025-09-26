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
      missao: {
        type: Sequelize.STRING
      },
      proposito: {
        type: Sequelize.STRING
      },
      historia: {
        type: Sequelize.STRING
      },
      perfil: {
        type: Sequelize.STRING
      },
      nivel_experiencia: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      regras_convivencia: {
        type: Sequelize.STRING
      },
      nivel_participacao: {
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