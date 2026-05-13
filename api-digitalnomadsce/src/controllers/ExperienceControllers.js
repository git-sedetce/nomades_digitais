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
      // 🔴 validação correta para single
      if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
      }

      const novoExperience = JSON.parse(req.body.dados);

      const criarExperience = await database.Experience.create(novoExperience, {
        transaction: t,
      });

      const file = req.file;

      const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];

      if (!tiposPermitidos.includes(file.mimetype)) {
        throw new Error("Tipo de arquivo não permitido");
      }

      // const caminho = file.path;
      const caminho = file.path.split("api-digitalnomadsce")[1];

      await database.anexo_experience.create(
        {
          mimetype: file.mimetype,
          filename: file.filename,
          experience_id: criarExperience.id,
          path: caminho,
        },
        { transaction: t },
      );

      await t.commit();

      return res.status(200).json(criarExperience);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ message: error.message });
    }
  }

  static async participacaoExperience(req, res) {
    const novoExperience = req.body;

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
      const hoje = new Date();
      const dataHoje = hoje.toISOString().split("T")[0]; // YYYY-MM-DD
      const horaAgora = hoje.toTimeString().split(" ")[0]; // HH:mm:ss

      const mostraExperiences = await database.Experience.findAll({
        where: {
          status: false,
          [Op.or]: [
            {
              data_experience: {
                [Op.gt]: dataHoje,
              },
            },
            {
              data_experience: dataHoje,
              horario_experience: {
                [Op.gt]: horaAgora,
              },
            },
          ],
        },
        order: [
          ["data_experience", "ASC"],
          ["horario_experience", "ASC"],
        ],
        attributes: [
          "id",
          "titulo",
          "descricao",
          "data_experience",
          "horario_experience",
          "valor",
          "user_id",
        ],
        include: [
          {
            model: database.User,
            as: "ass_experiences_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Tipo_Experience,
            as: "ass_experience_type",
            attributes: ["tipo_experience"],
          },
          {
            model: database.Cidades,
            as: "ass_experiences_cidade",
            attributes: ["nome_municipio"],
            include: [
              {
                model: database.Regiao,
                as: "ass_municipio_regiao",
                attributes: ["nome"],
              },
            ],
          },
          {
            model: database.anexo_experience,
            as: "ass_experience_anexos",
            attributes: ["mimetype", "filename", "path"],
          },
        ],
      });

      const experiences = mostraExperiences.map((exp) => exp.toJSON());

      for (const exp of experiences) {
        if (exp.ass_experience_anexos?.length) {
          for (const anexo of exp.ass_experience_anexos) {
            try {
              const caminho = path.join(baseUrl, anexo.path);

              if (fs.existsSync(caminho)) {
                const file = fs.readFileSync(caminho, "base64");
                anexo.base64 = `data:${anexo.mimetype};base64,${file}`;
              } else {
                anexo.base64 = null;
              }
            } catch (err) {
              console.error("Erro ao converter imagem:", err);
              anexo.base64 = null;
            }
          }
        }
      }

      return res.status(200).json(experiences);
    } catch (error) {
      console.error(error);
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
            attributes: [
              "id",
              "titulo",
              "descricao",
              "data_experience",
              "horario_experience",
              "valor",
              "user_id",
            ],
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
      const mostraExperience = await database.Experience.findAll({
        where: { id: Number(id) },
        attributes: [
          "id",
          "titulo",
          "descricao",
          "data_experience",
          "horario_experience",
          "valor",
          "user_id",
        ],
        include: [
          {
            model: database.User,
            as: "ass_experiences_user",
            attributes: ["nome_completo"],
          },
          {
            model: database.Tipo_Experience,
            as: "ass_experience_type",
            attributes: ["tipo_experience"],
          },
          {
            model: database.Cidades,
            as: "ass_experiences_cidade",
            attributes: ["nome_municipio"],
            include: [
              {
                model: database.Regiao,
                as: "ass_municipio_regiao",
                attributes: ["nome"],
              },
            ],
          },
          {
            model: database.anexo_experience,
            as: "ass_experience_anexos",
            attributes: ["mimetype", "filename", "path"],
          },
        ],
      });

      const experience = mostraExperience.map((exp) => exp.toJSON());

      for (const exp of experience) {
        if (exp.ass_experience_anexos?.length) {
          for (const anexo of exp.ass_experience_anexos) {
            try {
              const caminho = path.join(baseUrl, anexo.path);

              if (fs.existsSync(caminho)) {
                const file = fs.readFileSync(caminho, "base64");
                anexo.base64 = `data:${anexo.mimetype};base64,${file}`;
              } else {
                anexo.base64 = null;
              }
            } catch (err) {
              console.error("Erro ao converter imagem:", err);
              anexo.base64 = null;
            }
          }
        }
      }
      return res.status(200).json(experience);
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
            attributes: ["id","nome_completo"],
          },
          {
            model: database.Experience,
            as: "ass_cadastro_experience",
            attributes: [
              "titulo",
              "descricao",
              "data_experience",
              "horario_experience",
              "valor",
              "user_id",
            ],
          },
        ],
      });
      return res.status(200).json(mostraParticipantes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async verificaParticipantes(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraParticipantes = await database.cadastro_experience.findAll({
        where: { experience_id: Number(id) },
        order: [["user_id", "ASC"]],
        attributes: ["user_id", "experience_id"],
        
      });
      return res.status(200).json(mostraParticipantes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizaParticipante(req, res) {
    const { id } = req.params;
    const { confirmacao_presenca, ciente_pagamento } = req.body;

    try {
      const participante = await database.cadastro_experience.findOne({
        where: { id: Number(id) },
      });

      if (!participante) {
        return res.status(404).json({ error: 'Participante não encontrado.' });
      }

      await participante.update({
        confirmacao_presenca: confirmacao_presenca ?? participante.confirmacao_presenca,
        ciente_pagamento: ciente_pagamento ?? participante.ciente_pagamento,
      });

      return res.status(200).json(participante);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async pegaExperiencesByCity(req, res) {
    const { id } = req.params;
    try {
      const dataAtual = new Date(); // Obtém a data e hora atuais
      const mostraExperiences = await database.Experience.findAll({
        attributes: [
          "id",
          "titulo",
          "descricao",
          "data_experience",
          "horario_experience",
          "valor",
          "user_id",
        ],
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

  static async deletaParticipanteExperience(req, res) {
      const { id } = req.params;
      try {
        await database.cadastro_experience.destroy({ where: { id: Number(id) } });
        return res
          .status(200)
          .json({ message: `O Participante de id ${id} foi deletado com sucesso` });
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
}

module.exports = ExperienceController;
