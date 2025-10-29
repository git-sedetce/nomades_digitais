'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cadastra_nomads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      nomad_email: {
        type: Sequelize.STRING
      },
      contato_nomad: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      regiao: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      shared_info: {
        type: Sequelize.STRING
      },
      nomads_news: {
        type: Sequelize.STRING
      },
      suggestion: {
        type: Sequelize.STRING.STRING(500),
        allowNull: true
      },
      first_time_ce: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: true
      },
      motivo_viagem: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      know_how: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      profissao: {
        type: Sequelize,
        allowNull: true
      },
      possui_empresa: {
        type: Sequelize.STRING(5),
        allowNull: true
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },      
      deletedAt: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cadastra_nomads');
  }
};