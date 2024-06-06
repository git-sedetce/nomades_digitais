'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empresaNomades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_empresa: {
        type: Sequelize.STRING
      },
      cnpj: {
        type: Sequelize.STRING
      },
      setor: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      nomad_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'cadastra_nomads', key: 'id'}
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
    await queryInterface.dropTable('empresaNomades');
  }
};