'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('municipios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cidade: {
        type: Sequelize.STRING
      },
      regiao: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      historia: {
        type: Sequelize.STRING
      },
      wifi: {
        type: Sequelize.BOOLEAN
      },
      local_wifi: {
        type: Sequelize.STRING
      },
      servico: {
        type: Sequelize.STRING
      },
      manager_service: {
        type: Sequelize.STRING
      },
      seguranca: {
        type: Sequelize.STRING
      },
      pontos_turisticos: {
        type: Sequelize.STRING
      },
      espaco_cultural: {
        type: Sequelize.STRING
      },
      espaco_lazer: {
        type: Sequelize.STRING
      },
      tipo_turismo: {
        type: Sequelize.STRING
      },
      rota: {
        type: Sequelize.BOOLEAN
      },
      qual: {
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
    await queryInterface.dropTable('municipios');
  }
};