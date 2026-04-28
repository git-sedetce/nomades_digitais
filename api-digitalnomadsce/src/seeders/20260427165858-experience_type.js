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
    //  {
    //   perfil: 'Coordenador',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    //  },
    //  {
    //   perfil: 'Colaborador',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    //  }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tipo_Experiences', null, {});
  }
};
