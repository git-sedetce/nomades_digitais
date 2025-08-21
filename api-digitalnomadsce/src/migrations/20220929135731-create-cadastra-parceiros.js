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
      instagram_parceiro: {
        type: Sequelize.STRING,
        allowNull: true
      },
      midia_social: {
        type: Sequelize.STRING
      },
      tipo_service: {
        type: Sequelize.STRING
      },
      essential_service: {
        type: Sequelize.STRING(500)
      },
      internet_speed: {
        type: Sequelize.STRING
      },
      internet_service: {
        type: Sequelize.STRING
      },
      tipo_estabelecimento: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipo_estabelecimento_outros: {
        type: Sequelize.STRING,
        allowNull: true
      },
      outro_servico: {
        type: Sequelize.STRING(500)
      },
      trabalho_reunioes: {
        type: Sequelize.STRING
      },
      tarifa_especial: {
        type: Sequelize.STRING(500)
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
        type: Sequelize.STRING(500)
      },
      espacos_culturais: {
        type: Sequelize.STRING(500)
      },
      idioma: {
        type: Sequelize.STRING
      },
      qual_idioma: {
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