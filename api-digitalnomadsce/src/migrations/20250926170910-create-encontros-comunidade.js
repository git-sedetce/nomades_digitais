'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EncontrosComunidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comunidade_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Comunidades', key: 'id' }
      },
      lugar: {
        type: Sequelize.STRING
      },
      formato: {
        type: Sequelize.STRING
      },
      data_encontro: {
        type: Sequelize.DATEONLY
      },
      hora: {
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
    await queryInterface.dropTable('EncontrosComunidades');
  }
};