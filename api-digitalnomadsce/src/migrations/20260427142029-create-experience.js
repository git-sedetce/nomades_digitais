'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Experiences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      data_experience: {
        type: Sequelize.DATEONLY
      },
      valor: {
        type: Sequelize.DOUBLE
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      cidade_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' }
      },
      experience_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Tipo_Experiences', key: 'id' }
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
    await queryInterface.dropTable('Experiences');
  }
};