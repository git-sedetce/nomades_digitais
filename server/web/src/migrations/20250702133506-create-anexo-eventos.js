'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('anexo_eventos', {
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
      tipo_anexo: {
        type: Sequelize.STRING
      },
      evento_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Eventos', key: 'id'}
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
    await queryInterface.dropTable('anexo_eventos');
  }
};