'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      evento_name: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      tipo_evento: {
        type: Sequelize.STRING
      },
      data_inicio_evento: {
        type: Sequelize.DATEONLY
      },
      data_final_evento: {
        type: Sequelize.DATEONLY
      },
      evento_diario: {
        type: Sequelize.BOOLEAN
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cidades', key: 'id' }
      },
      regiao_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Regiaos', key: 'id' }
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
    await queryInterface.dropTable('Eventos');
  }
};