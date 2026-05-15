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
        {
          name: "MARIA FERNANDA",
          lastName: "ZEPEDA MEJIA",
          nomad_email: "mariaferzepeda7@gmail.com",
          contato_nomad: "+5551993106712",
          cidade: "POA",
          regiao: "RS",
          country: "Brasil",
          shared_info: "sim",
          nomads_news: "sim",
          suggestion: "",
          first_time_ce: "sim",
          data_nascimento: "1998-05-03",
          motivo_viagem: "turismo",
          know_how: "Internet",
          profissao: "ADM",
          possui_empresa: "não",
          createdAt: "2025-12-01 15:08:02.277+00",
          updatedAt: "2025-12-01 15:08:02.277+00",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cadastra_nomads", null, {});
  },
};
