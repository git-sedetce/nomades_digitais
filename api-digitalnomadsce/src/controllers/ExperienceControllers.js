const database = require("../models");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { Sequelize, QueryTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd(); //+ "/src"; __dirname + '.

class ExperienceController {
  static async cadastraExperience(req, res) {
    const t = await database.sequelize.transaction();
    try {
      if (!req.files?.image) {
        return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
      }
      const novoExperience = JSON.parse(req.body.dados);
      // console.log('novoNomads', novoNomads)

      const criarExperience = await database.Experience.create(dados, {
        transaction: t,
      });
      const arquivos = [
        {
          file: req.files.image[0],
        },
      ];

      const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];

      for (const item of arquivos) {
        if (!tiposPermitidos.includes(item.file.mimetype)) {
          throw new Error("Tipo de arquivo não permitido");
        }

        // const caminho = item.file.path.split(process.env.SPLIT)[1];
        const caminho = file[img].path;

        await database.anexo_experience.create(
          {
            mimetype: item.file.mimetype,
            filename: item.file.filename,
            experience_id: criarExperience.id,
            path: caminho,
          },
          { transaction: t },
        );
      }

      // ===== 5. COMMIT =====
      await t.commit();

      return res.status(200).json(novoExperience);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ message: error.message });
    }
  }

  static async participacaoExperience(req, res) {
    const novoExperience = req.body;
    // console.log('novoNomads', novoNomads)

    try {
      const criarExperience =
        await database.cadastro_experience.create(novoExperience);

      return res.status(200).json(criarExperience);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaExperiences(req, res) {
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraExperiences = await database.Experience.findAll({
        order: [["data_experience", "ASC"]],
        attributes: ["id", "titulo", "descricao", "data_experience", "valor"],
        include: [
          {
            model: database.Experience,
            as: "ass_experiences_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Tipo_Experience,
            as: "ass_experience_type",
            attributes: ["tipo_experience"],
          },
        ],
      });
      return res.status(200).json(mostraExperiences);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegarParticipantes(req, res) {
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraParticipantes = await database.cadastro_experience.findAll({
        order: [["user_id", "ASC"]],
        attributes: ["id", "confirmacao_presenca", "ciente_pagamento"],
        include: [
          {
            model: database.User,
            as: "ass_cadastro_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Experience,
            as: "ass_cadastro_experience",
            attributes: ["titulo", "descricao", "data_experience", "valor"],
          },
        ],
      });
      return res.status(200).json(mostraParticipantes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaExperiencesById(req, res) {
    const { id } = req.params;
    try {
      const mostraExperiences = await database.Experience.findAll({
        where: { id: Number(id) },
        attributes: ["titulo", "descricao", "data_experience", "valor"],
        include: [
          {
            model: database.Experience,
            as: "ass_experiences_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Tipo_Experience,
            as: "ass_experience_type",
            attributes: ["tipo_experience"],
          },
        ],
      });
      return res.status(200).json(mostraExperiences);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegarParticipantesById(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraParticipantes = await database.cadastro_experience.findAll({
        where: { experience_id: Number(id) },
        order: [["user_id", "ASC"]],
        attributes: ["id", "confirmacao_presenca", "ciente_pagamento"],
        include: [
          {
            model: database.User,
            as: "ass_cadastro_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Experience,
            as: "ass_cadastro_experience",
            attributes: ["titulo", "descricao", "data_experience", "valor"],
          },
        ],
      });
      return res.status(200).json(mostraParticipantes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaExperiencesByCity(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraExperiences = await database.Experience.findAll({
        attributes: ["titulo", "descricao", "data_experience", "valor"],
        include: [
          {
            model: database.Experience,
            as: "ass_experiences_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Tipo_Experience,
            as: "ass_experience_type",
            attributes: ["tipo_experience"],
          },
        ],
        where: {
          cidade_id: Number(id),
          data_experience: {
            [database.Sequelize.Op.gte]: dataAtual, // Filtra experiences com data_experience maior ou igual à dataAtual
          },
        },
        order: [["data_experience", "ASC"]],
      });
      return res.status(200).json(mostraExperiences);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async anexoExperience(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path.split("api-digitalnomadsce")[1];
    const nome_arquivo = file.filename;
    const type = file.mimetype;
    // console.log(file);
    // console.log(id);
    if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
      try {
        const anexarParceiro = await database.anexo_experience.create({
          mimetype: type,
          filename: nome_arquivo,
          path: caminho,
          experience_id: id,
          raw: true,
        });
        // console.log('anexarParceiro', anexarParceiro)
        return res
          .status(200)
          .json({ message: "Experience anexado com sucesso!" });
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

  static async pegaImagensExperiencesById(req, res) {
    const { id } = req.params;
    try {
      const imageExperience = await database.anexo_experience.findOne({
        where: { experience_id: Number(id) },
        attributes: ["path"],
      });
      if (!imageExperience) {
        return res.status(404).send({
          message: "Imagem não encontrada",
        });
      }

      const acesso = path.join(baseUrl, imageExperience.path);
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

  static async pegaTypeExperiences(req, res) {
    try {
      const mostraTipoExperiences = await database.Tipo_Experience.findAll({
        order: [["tipo_experience", "ASC"]],
        attributes: ["id", "tipo_experience"],
      });
      return res.status(200).json(mostraTipoExperiences);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ExperienceController;
