const database = require("../models");
const { Op } = require("sequelize");
const { Sequelize, QueryTypes, literal } = require("sequelize");

class VagasEmpregoController {
  static async jobVacancy(req, res) {
    const newJob = req.body;
    // console.log("newJob", newJob);

    try {
      const criarVaga = await database.Vagas_Emprego.create(newJob);

      return res.status(200).json(criarVaga);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraVagaNomad(req, res) {
    const newJobNomad = req.body;
    // console.log("newJobNomad", newJobNomad);

    try {
      const criarVaga = await database.Emprego_Nomad.create(newJobNomad);

      return res.status(200).json(criarVaga);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getjobs(req, res) {
    try {
      const vagas = await database.Vagas_Emprego.findAll({
        attributes: ["id", "nome_vaga", "descricao", "status"],
        include: [
          {
            model: database.cadastra_parceiros,
            as: "ass_parceiros_vagas",
            attributes: ["cnpj", "nome_fantasia"],
          },
        ],
      });
      return res.status(200).json(vagas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegavaga(req, res) {
    const { id } = req.params;
    try {
      const mostraComunidade = await database.Vagas_Emprego.findOne({
        where: { id: Number(id) },
        attributes: ["id", "nome_vaga", "descricao", "status"],
        include: [
          {
            model: database.cadastra_parceiros,
            as: "ass_parceiros_vagas",
            attributes: ["cnpj", "nome_fantasia"],
          },
        ],
      });
      return res.status(200).json(mostraComunidade);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VagasEmpregoController;
