const database = require("../models");
const { Op } = require("sequelize");
const { Sequelize, QueryTypes, literal } = require("sequelize");

class ComunityController {
  static async cadastraComunidade(req, res) {
    const novaComunidade = req.body;
    // console.log("novaComunidade", novaComunidade);

    try {
      const criarComunidade = await database.Comunidade.create(novaComunidade);

      return res.status(200).json(criarComunidade);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraMidiaComunidade(req, res) {
    const midiaComunidade = req.body;
    // console.log("midiaComunidade", midiaComunidade);

    try {
      const novaMidiaComunidade = await database.ConectComunidade.create(
        midiaComunidade
      );

      return res.status(200).json(novaMidiaComunidade);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraEncontrosComunidade(req, res) {
    const meetComunidade = req.body;
    // console.log("meetComunidade", meetComunidade);

    try {
      const newMeetComunidade = await database.EncontrosComunidade.create(
        meetComunidade
      );

      return res.status(200).json(newMeetComunidade);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaComunidade(req, res) {
    try {
      const comunidades = await database.Comunidade.findAll();
      return res.status(200).json(comunidades);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  static async pegaOnlyComunidade(req, res) {
    try {
      const comunidades = await database.Comunidade.findAll({
        attributtes: [
          "id",
          "name"
        ],
      });
      return res.status(200).json(comunidades);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaMidia(req, res) {
    try {
      const midia = await database.ConectComunidade.findAll();
      return res.status(200).json(midia);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaEncontros(req, res) {
    try {
      const encontros = await database.EncontrosComunidade.findAll();
      return res.status(200).json(encontros);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaComunidadeById(req, res) {
    const { id } = req.params;
    try {
      const mostraComunidade = await database.Comunidade.findOne({
        where: { id: Number(id) },
        attributtes: [
          "id",
          "name",
          "missao",
          "proposito",
          "historia",
          "perfil",
          "nivel_experiencia",
          "idioma",
          "regras_convivencia",
          "nivel_participacao",
        ],
      });
      return res.status(200).json(mostraComunidade);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaMidiaById(req, res) {
    const { id } = req.params;
    try {
      const mostraMidia = await database.ConectComunidade.findOne({
        where: { id: Number(id) },
        attributtes: ["id", "plataforma", "acesso_midia"],
        include: [
          {
            model: database.Comunidade,
            as: "ass_conect_comunity",
            attribute: ["name"],
          },
        ],
      });
      return res.status(200).json(mostraMidia);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaEncontrosByCity(req, res) {
    const { id } = req.params;
    try {
      const mostraEncontros = await database.EncontrosComunidade.findOne({
        where: { id: Number(id) },
        attributtes: [
          "id",
          "lugar",
          "formato",
          "data_encontro",
          "hora",
          "cep",
          "logradouro",
          "numero",
          "complemento",
          "bairro",
          "cidade",
          "estado"
        ],
        include: [
          {
            model: database.Comunidade,
            as: "ass_meet_comunity",
            attribute: ["name"],
          },
        ],
      });
      return res.status(200).json(mostraEncontros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ComunityController;
