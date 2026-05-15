'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('anexo_temporadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mimetype: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      temporada_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'TemporadaNomads', key: 'id' }
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
    await queryInterface.dropTable('anexo_temporadas');
  }
};