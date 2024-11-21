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
      departure_date: {
        type: Sequelize.DATE
      },
      shared_info: {
        type: Sequelize.STRING
      },
      nomads_news: {
        type: Sequelize.STRING
      },
      suggestion: {
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
    await queryInterface.dropTable('cadastra_nomads');
  }
};