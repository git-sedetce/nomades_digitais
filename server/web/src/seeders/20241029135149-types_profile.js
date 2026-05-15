'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', [
      {
      perfil: 'user_nomad',
      is_master: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },    
    {
      perfil: 'user_partner',
      is_master: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      perfil: 'admin',
      is_master: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      perfil: 'user_comunity',
      is_master: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      perfil: 'user_municipio',
      is_master: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
