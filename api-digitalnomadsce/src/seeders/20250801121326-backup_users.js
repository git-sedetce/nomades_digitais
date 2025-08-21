'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      nome_completo: "Daniel Oliveira Araújo",
      user_name: "daniel.araujo",
      user_email: "daniel.araujo@sde.ce.gov.br",
      user_active: 'True',
      user_password: "$2a$10$XdWkSHcY1PNhsJOCXvvC5eNpbJlTcuRrZNajOh34K649t6WPfskZO",
      user_pin: "8416",
      profile_id: 3,
      createdAt: "2024-11-25 17:53:02.277035+00",
      updatedAt: "2024-11-25 17:56:12.746+00"
    },
    {
      nome_completo: "Go Offices Coworking",
      user_name: "contato",
      user_email: "contato@goocoworking.com.br",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "5868",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Israel Coworking",
      user_name: "israelcoworkingoffice",
      user_email: "israelcoworkingoffice@gmail.com",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "2477",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Planet Coworking",
      user_name: "planet.coworking",
      user_email: "contato@planetcoworking.com.br",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "8830",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Pousada Paradise Kite Club",
      user_name: "paradisekiteclub",
      user_email: "paradisekiteclub@gmail.com",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "3375",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Tango Suites Coworking",
      user_name: "tangosuitescumbuco",
      user_email: "tangosuitescumbuco@gmail.com",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "8906",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Transforme Coworking",
      user_name: "transforme.coworking",
      user_email: "contato@transformebr.com.br",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "6213",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Tucano Pousada",
      user_name: "brasil.adm",
      user_email: "brasil.adm@hotmail.com",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "6275",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "UP2 Hostelbar",
      user_name: "up2hostel",
      user_email: "adm@up2hostel.com.br",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "3079",
      profile_id: 2,
      createdAt: "2024-11-25 18:14:14.407616+00",
      updatedAt: "2024-11-25 18:14:14.407616+00"
    },  
    {
      nome_completo: "Cláudia Jane Gomes",
      user_name: "claudia.jane.gomes",
      user_email: "claudia.jane.gomes@gmail.com",
      user_active: 'False',
      user_password: "720fd4ce07f151925f8294119d04b37b",
      user_pin: "6042",
      profile_id: 1,
      createdAt: "2024-11-25 18:19:00.14419+00",
      updatedAt: "2024-11-25 18:19:00.14419+00"
    },  
    
  ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});

  }
};
