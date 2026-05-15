'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vagas_Empregos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parceiro_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'cadastra_parceiros', key: 'id' }
      },
      nome_vaga: {
        type: Sequelize.STRING
      },
      email_vaga: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      // status: {
      //   type: Sequelize.STRING
      // },
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
    await queryInterface.dropTable('Vagas_Empregos');
  }
};