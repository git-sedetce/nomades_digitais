'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TemporadaNomads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_evento: {
        type: Sequelize.STRING
      },
      data_evento: {
        type: Sequelize.DATEONLY
      },
      horario: {
        type: Sequelize.STRING
      },
      tipo_evento: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING(5000)
      },
      local: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      cidade_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' }
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
    await queryInterface.dropTable('TemporadaNomads');
  }
};