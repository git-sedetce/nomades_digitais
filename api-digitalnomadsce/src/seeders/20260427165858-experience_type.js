'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tipo_Experiences', [
    {
      tipo_experience: 'Cultural',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Gastronômico',
      createdAt: new Date(),
      updatedAt: new Date()
     },
    {
      tipo_experience: 'Apresentações',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Moda',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Esportes',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Paisagismo',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Turismo Ecológico',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Galerias',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      tipo_experience: 'Passeios de Barco',
      createdAt: new Date(),
      updatedAt: new Date()
     },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tipo_Experiences', null, {});
  }
};
