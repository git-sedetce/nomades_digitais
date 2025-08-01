"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "anexo_municipios",
      [
        {
          mimetype: "image/jpeg",
          filename:
            "1669750500024_digital_nomads_municipios_coral_location_guajiru_03@2x.jpg",
          path: "uploads/municipios/1669750500024_digital_nomads_municipios_coral_location_guajiru_03@2x.jpg",
          municipio_id: 13,
          createdAt: "2022-11-29 19:35:00.171+00",
          updatedA: "2022-11-29 19:35:00.171+00",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("anexo_municipios", null, {});
  },
};
