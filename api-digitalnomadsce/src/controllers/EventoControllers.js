const database = require("../models");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { Sequelize, QueryTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd(); //+ "/src"; __dirname + '.

class EventoController {
  static async cadastraEvento(req, res) {
    const novoEvento = req.body;
    // console.log('novoNomads', novoNomads)

    try {
      const criarEvento = await database.Evento.create(novoEvento);

      return res.status(200).json(criarEvento);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaEventos(req, res) {
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraEventos = await database.Evento.findAll({
        where: {
          data_inicio_evento: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
          },
        },
        order: [["data_inicio_evento", "ASC"]],
        attributes: [
          "evento_name",
          "descricao",
          "tipo_evento",
          "data_inicio_evento",
          "data_final_evento",
        ],
        include: [
          {
            model: database.Cidades,
            as: "ass_evento_municipio",
            attributes: ["nome_municipio"],
          },
          {
            model: database.Regiao,
            as: "ass_evento_regiao",
            attributes: ["nome"],
          },
          {
            model: database.anexo_eventos,
            as: "ass_evento_anexo",
            attributes: ["mimetype", "filename", "path", "evento_id"],
          },
        ],
      });
      return res.status(200).json(mostraEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaEventosById(req, res) {
    const { id } = req.params;
    try {
      const mostraEventos = await database.Evento.findAll({
        where: { id: Number(id) },
        attributes: [
          "evento_name",
          "descricao",
          "tipo_evento",
          "data_inicio_evento",
          "data_final_evento",
        ],
        include: [
          {
            model: database.Cidades,
            as: "ass_evento_municipio",
            attributes: ["nome_municipio"],
          },
          {
            model: database.Regiao,
            as: "ass_evento_regiao",
            attributes: ["nome"],
          },
          {
            model: database.anexo_eventos,
            as: "ass_evento_anexo",
            attributes: [],
          },
        ],
      });
      return res.status(200).json(mostraEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaEventosByCity(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraEventos = await database.Evento.findAll({
        attributes: [
          "evento_name",
          "descricao",
          "tipo_evento",
          "data_inicio_evento",
          "data_final_evento",
        ],
        where: {
          city_id: Number(id),
          data_inicio_evento: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
          },
        },
        order: [["data_inicio_evento", "ASC"]],
        include: [
          {
            model: database.Cidades,
            as: "ass_evento_municipio",
            attributes: ["nome_municipio"],
          },
          {
            model: database.Regiao,
            as: "ass_evento_regiao",
            attributes: ["nome"],
          },
        ],
      });
      return res.status(200).json(mostraEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaEventosByRegion(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraEventos = await database.Evento.findAll({
        where: {
          regiao_id: Number(id),
          data_inicio_evento: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
          },
        },
        order: [["data_inicio_evento", "ASC"]],
        attributes: [
          "evento_name",
          "descricao",
          "tipo_evento",
          "data_inicio_evento",
          "data_final_evento",
        ],
        include: [
          {
            model: database.Cidades,
            as: "ass_evento_municipio",
            attributes: ["nome_municipio"],
          },
          {
            model: database.Regiao,
            as: "ass_evento_regiao",
            attributes: ["nome"],
          },
        ],
      });
      return res.status(200).json(mostraEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async anexoEvento(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path.split("api-digitalnomadsce")[1];
    const nome_arquivo = file.filename;
    const type = file.mimetype;
    // console.log(file);
    // console.log(id);
    if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
      try {
        const anexarParceiro = await database.anexo_eventos.create({
          mimetype: type,
          filename: nome_arquivo,
          path: caminho,
          evento_id: id,
          tipo_anexo: "banner",
          raw: true,
        });
        // console.log('anexarParceiro', anexarParceiro)
        return res
          .status(200)
          .json({ message: "Banner de divulgação anexado com sucesso!" });
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } else {
      return res.status(500).json({
        message:
          "Somente arquivo com extensão .jpg, .jpeg ou .png são permitidos!",
      });
    }
    //res.send("Arquivo recebido!")
  }

  static async pegaImagensEventosById(req, res) {
    const { id } = req.params;
    try {
      const imageEvento = await database.anexo_eventos.findOne({
        where: { evento_id: Number(id), tipo_anexo: "banner" },
        attributes: ["path"],
      });
      if (!imageEvento) {
        return res.status(404).send({
          message: "Imagem não encontrada",
        });
      }

      const acesso = path.join(baseUrl, imageEvento.path);
      // console.log('acesso', acesso)
      // Lendo o conteúdo do arquivo imagem
      fs.readFile(acesso, "base64", function (err, data) {
        if (err) {
          console.error(err);
          return res.status(500).send({
            message: "Erro ao ler a imagem",
          });
        }
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async pegaEventosByCommunity(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraEventos = await database.Evento.findAll({
        attributes: [
          "evento_name",
          "descricao",
          "tipo_evento",
          "data_inicio_evento",
          "data_final_evento",
          "is_comunity"
        ],
        where: {
          comunidade_id: Number(id),
          data_inicio_evento: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
          },
        },
        order: [["data_inicio_evento", "ASC"]],
        include: [
          {
            model: database.Cidades,
            as: "ass_evento_municipio",
            attributes: ["nome_municipio"],
          },
          {
            model: database.Regiao,
            as: "ass_evento_regiao",
            attributes: ["nome"],
          },
        ],
      });
      return res.status(200).json(mostraEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaEventosByCommunityWithFreq(req, res) {
    const { id } = req.params;
    try {      
      const mostraEventos = await database.Evento.findAll({
        attributes: [
          "evento_name",
          "descricao",
          "tipo_evento",
          "horario",
          "dia_frequente",
        ],
        where: {
          comunidade_id: Number(id),
          is_frequency: true
        },
        include: [
          {
            model: database.Cidades,
            as: "ass_evento_municipio",
            attributes: ["nome_municipio"],
          },
          {
            model: database.Regiao,
            as: "ass_evento_regiao",
            attributes: ["nome"],
          },
        ],
      });
      return res.status(200).json(mostraEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EventoController;
