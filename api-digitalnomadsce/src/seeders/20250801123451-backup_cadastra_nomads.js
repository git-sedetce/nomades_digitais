"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cadastra_nomads",
      [
        {
          name: "Cláudia Jane",
          lastName: "Gomes",
          nomad_email: "claudia.jane.gomes@gmail.com",
          contato_nomad: "85 991579648",
          cidade: "Itapajé",
          regiao: "Ceará",
          country: "Brasil",
          shared_info: "sim",
          nomads_news: "sim",
          suggestion: "",
          createdAt: "2023-01-03 19:04:47.722+00",
          updatedAt: "2023-01-03 19:04:47.722+00",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cadastra_nomads", null, {});
  },
};
