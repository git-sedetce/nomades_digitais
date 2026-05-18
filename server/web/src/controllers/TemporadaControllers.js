const database = require("../models");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { Sequelize, QueryTypes, literal } = require("sequelize");
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd(); //+ "/src"; __dirname + '.

class TemporadaController {
  static async cadastraTemporada(req, res) {
    const novaTemporada = req.body;
    console.log("novaTemporada", novaTemporada);

    try {
      const criarTemporada = await database.TemporadaNomad.create(
        novaTemporada
      );

      return res.status(200).json(criarTemporada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // static async pegaTemporadas(req, res) {
  //   try {
  //     const dataAtual = new Date(); // Obtém a data e hora atuais
  //     const mostraTemporada = await database.TemporadaNomad.findAll({
  //       where: {
  //         data_evento: {
  //           [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
  //         },
  //       },
  //       order: [["data_evento", "ASC"]],
  //       attributtes: [
  //         "nome_evento",
  //         "data_evento",
  //         "horario",
  //         "tipo_evento",
  //         "local",
  //         "endereco",
  //       ],
  //       include: [
  //         {
  //           model: database.Cidades,
  //           as: "ass_temporada_cidade",
  //           attribute: ["nome_municipio"],
  //         },
  //         {
  //           model: database.anexo_temporada,
  //           as: "ass_anexo_temporada",
  //           attribute: [],
  //         },
  //       ],
  //     });
  //     return res.status(200).json(mostraTemporada);
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // }

  static async pegaTemporadaById(req, res) {
    const { id } = req.params;
    try {
      const mostraTemporada = await database.TemporadaNomad.findOne({
        where: { id: Number(id) },
        attributtes: [
          "nome_evento",
          "data_evento",
          "horario",
          "tipo_evento",
          "local",
          "endereco",
        ],
        include: [
          {
            model: database.Cidades,
            as: "ass_temporada_cidade",
            attribute: ["nome_municipio"],
          },
          {
            model: database.anexo_temporada,
            as: "ass_anexo_temporada",
            attribute: [],
          },
        ],
      });
      return res.status(200).json(mostraTemporada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async anexoImagem(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path.split(process.env.SPLIT)[1];
    const nome_arquivo = file.filename;
    const type = file.mimetype;
    // console.log(file);
    // console.log(id);
    if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
      try {
        const anexarimageTemporada = await database.anexo_temporada.create({
          mimetype: type,
          filename: nome_arquivo,
          path: caminho,
          temporada_id: id,
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

  static async pegaImagensTemporadaById(req, res) {
    const { id } = req.params;
    try {
      const imageEvento = await database.anexo_temporada.findOne({
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

  static async pegaTemporadas(req, res) {
    const imagensData = [];

    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      // Buscar todos os eventos da Temporada Nomade
      const temporadas = await database.TemporadaNomad.findAll({
        where: {
          data_evento: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
          },
        },
        attributes: ["id", "nome_evento", "data_evento", "horario", "tipo_evento", "local", "endereco", "descricao"],
        include: [
          {
            model: database.Cidades,
            as: "ass_temporada_cidade",
            attribute: ["nome_municipio"],
          },
        ]
      });

      // Para cada município, buscar 1 anexo aleatório e montar o objeto com base64
      for (const temporada of temporadas) {
        const anexo = await database.anexo_temporada.findOne({
          where: {
            temporada_id: temporada.id,
          },
          order: [literal("RANDOM()")], // sorteia um
        });

        if (!anexo) continue; // ignora se não tiver imagem

        const caminhoImagem = path.join(baseUrl, anexo.path);
        if (!fs.existsSync(caminhoImagem)) continue; // ignora se arquivo não existir

        const base64 = fs.readFileSync(caminhoImagem, "base64");

        imagensData.push({
          id: anexo.id,
          temporada_id: anexo.temporada_id,
          nome_evento: temporada.nome_evento,
          data_evento: temporada.data_evento,
          tipo_evento: temporada.tipo_evento,
          horario: temporada.horario,
          local: temporada.local,
          endereco: temporada.endereco,
          descricao: temporada.descricao,
          cidade: temporada.ass_temporada_cidade.nome_municipio,
          mimetype: anexo.mimetype,
          base64: base64,
        });
      }

      return res.status(200).json(imagensData);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTemporadasbyCity(req, res) {
    const { cidade } = req.params;
    const imagensData = [];

    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      // Buscar todos os eventos da Temporada Nomade
      const temporadas = await database.TemporadaNomad.findAll({
        where: {
          data_evento: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra eventos com data_inicio_evento maior ou igual à dataAtual
          },
          cidade_id: cidade
        },
        attributes: ["id", "nome_evento", "data_evento", "horario", "tipo_evento", "local", "endereco", "descricao"],
        include: [
          {
            model: database.Cidades,
            as: "ass_temporada_cidade",
            attributes: ["nome_municipio"],
          },
        ]
      });

      // Para cada município, buscar 1 anexo aleatório e montar o objeto com base64
      for (const temporada of temporadas) {
        const anexo = await database.anexo_temporada.findOne({
          where: {
            temporada_id: temporada.id,
          },
          order: [literal("RANDOM()")], // sorteia um
        });

        if (!anexo) continue; // ignora se não tiver imagem

        const caminhoImagem = path.join(baseUrl, anexo.path);
        if (!fs.existsSync(caminhoImagem)) continue; // ignora se arquivo não existir

        const base64 = fs.readFileSync(caminhoImagem, "base64");

        imagensData.push({
          id: anexo.id,
          temporada_id: anexo.temporada_id,
          nome_evento: temporada.nome_evento,
          data_evento: temporada.data_evento,
          tipo_evento: temporada.tipo_evento,
          horario: temporada.horario,
          local: temporada.local,
          endereco: temporada.endereco,
          descricao: temporada.descricao,
          cidade: temporada.ass_temporada_cidade.nome_municipio,
          mimetype: anexo.mimetype,
          base64: base64,
        });
      }

      return res.status(200).json(imagensData);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TemporadaController;
