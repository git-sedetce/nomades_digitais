'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('anexos', {
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
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'cadastra_parceiros', key: 'id'}
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
    await queryInterface.dropTable('anexos');
  }
};