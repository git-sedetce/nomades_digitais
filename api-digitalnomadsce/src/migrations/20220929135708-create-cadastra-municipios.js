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
        type: Sequelize.STRING(500)
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
        type: Sequelize.STRING(500)
      },
      service_empresario: {
        type: Sequelize.STRING(500)
      },
      service_seguranca: {
        type: Sequelize.STRING(500)
      },
      pontos_turisticos: {
        type: Sequelize.STRING(500)
      },
      espacos_culturais: {
        type: Sequelize.STRING(500)
      },
      espacos_lazer: {
        type: Sequelize.STRING(500)
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
      tourism_ecologico: {
        type: Sequelize.STRING
      },
      tourism_praiano: {
        type: Sequelize.STRING(200)
      },
      tourism_radical: {
        type: Sequelize.STRING(200)
      },
      tourism_religioso: {
        type: Sequelize.STRING(200)
      },
      tourism_serrano: {
        type: Sequelize.STRING(200)
      },
      tourism_sertanejo: {
        type: Sequelize.STRING(200)
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