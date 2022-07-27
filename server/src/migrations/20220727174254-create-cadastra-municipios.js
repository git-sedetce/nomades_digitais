'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cadastra_municipios', {
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
      email_prefeitura: {
        type: Sequelize.STRING
      },
      contato_prefeitura: {
        type: Sequelize.STRING
      },
      link_prefeitura: {
        type: Sequelize.STRING
      },
      historia_cidade: {
        type: Sequelize.STRING
      },
      wifi_service: {
        type: Sequelize.STRING
      },
      wifi_cidade: {
        type: Sequelize.STRING
      },
      service_estrangeiro: {
        type: Sequelize.STRING
      },
      service_cidade: {
        type: Sequelize.STRING
      },
      service_empresario: {
        type: Sequelize.STRING
      },
      service_seguranca: {
        type: Sequelize.STRING
      },
      pontos_turisticos: {
        type: Sequelize.STRING
      },
      espacos_culturais: {
        type: Sequelize.STRING
      },
      espacos_lazer: {
        type: Sequelize.STRING
      },
      tipo_turismo: {
        type: Sequelize.STRING
      },
      rota: {
        type: Sequelize.STRING
      },
      qual_rota: {
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
    await queryInterface.dropTable('cadastra_municipios');
  }
};