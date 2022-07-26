'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cadastra_parceiros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cnpj: {
        type: Sequelize.STRING
      },
      nome_fantasia: {
        type: Sequelize.STRING
      },
      razao_social: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      logradouro: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      email_parceiro: {
        type: Sequelize.STRING
      },
      midia_social: {
        type: Sequelize.STRING
      },
      tipo_service: {
        type: Sequelize.STRING
      },
      essential_service: {
        type: Sequelize.STRING
      },
      internet_speed: {
        type: Sequelize.STRING
      },
      internet_service: {
        type: Sequelize.STRING
      },
      outro_servico: {
        type: Sequelize.STRING
      },
      trabalho_reunioes: {
        type: Sequelize.STRING
      },
      tarifa_especial: {
        type: Sequelize.STRING
      },
      internet_service_alimentacao: {
        type: Sequelize.STRING
      },
      orienta_equipe: {
        type: Sequelize.STRING
      },
      localizacao: {
        type: Sequelize.STRING
      },
      ramo: {
        type: Sequelize.STRING
      },
      beneficios: {
        type: Sequelize.STRING
      },
      espacos_culturais: {
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
    await queryInterface.dropTable('cadastra_parceiros');
  }
};