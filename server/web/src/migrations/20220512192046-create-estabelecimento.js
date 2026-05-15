'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estabelecimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cnpj: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      nome_fantasia: {
        type: Sequelize.STRING
      },
      razao_social: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      redes_sociais: {
        type: Sequelize.STRING
      },
      acesso_internet: {
        type: Sequelize.BOOLEAN
      },
      velocidade_internet: {
        type: Sequelize.STRING
      },
      servicos: {
        type: Sequelize.STRING
      },
      reuniao: {
        type: Sequelize.STRING
      },
      proposta: {
        type: Sequelize.STRING
      },
      resumo: {
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
    await queryInterface.dropTable('estabelecimentos');
  }
};