const database = require("../models");
const nodemailer = require("nodemailer");
const path = require("path");
const baseUrl = process.cwd(); //+ "/src"; __dirname + '.
const fs = require("fs");
const { Sequelize, Op, literal } = require("sequelize");
const bcrypt = require("bcryptjs");

class CadastroMunicipioController {
  static async cadastraMunicipioParceiro(req, res) {

    const t = await database.sequelize.transaction();

    try {

        const dados = JSON.parse(req.body.dados);

        const arquivos = req.files || [];
        console.log('arquivos', arquivos)        

        const criarMunicipioParceiro =
            await database.cadastra_municipios.create(
                dados,
                { transaction: t }
            );

        // SALVA IMAGENS
        if (arquivos.length > 0) {

            for (const file of arquivos) {
              console.log('file', file)
              console.log('file.path', file.path);
              console.log('file.filename', file.filename);
              console.log('process.env.SPLIT', process.env.SPLIT);
              console.log('split result', file.path.split(process.env.SPLIT));

                await database.anexo_municipio.create({

                    mimetype: file.mimetype,

                    filename: file.filename,

                    path: file.path.split(process.env.SPLIT)[1],
                    // path: `/uploads/municipios/${file.filename}`,

                    municipio_id: criarMunicipioParceiro.id

                }, { transaction: t });

            }

        }

        // CRIA USUÁRIO
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            dados.email_prefeitura,
            salt
        );

        const pin = Math.floor(1000 + Math.random() * 9000);

        const nome_usuario =
            dados.email_prefeitura.split("@");

        await database.User.create({

            nome_completo: dados.cidade,

            user_name: nome_usuario[0],

            user_email: dados.email_prefeitura,

            user_active: false,

            user_password: hashedPassword,

            user_pin: pin,

            profile_id: 5,

        }, { transaction: t });

        await t.commit();

        return res.status(200).json({

            message: 'Município cadastrado com sucesso!',

            municipio: criarMunicipioParceiro

        });

    } catch (error) {

        await t.rollback();

        return res.status(500).json({

            message: error.message

        });

    }

}

  static async pegarMunicipioParceiro(req, res) {
    try {
      const mostraMunicipioParceiro =
        await database.cadastra_municipios.findAll();
      return res.status(200).json(mostraMunicipioParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async municipioParceiroById(req, res) {
    const { id } = req.params;
    try {
      const umMunicipioParceiro = await database.cadastra_municipios.findOne({
        where: { id: Number(id) },
        include:[
            {
              association: "ass_cadastra_municipios_cidade",
              attributes: ["nome_municipio"],
            },
            {
              association: "ass_cadastra_municipios_regiao",
              attributes: ["nome"],
            }
          ]
      });
      return res.status(200).json(umMunicipioParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async municipioParceiroByName(req, res) {
    const { cidade } = req.params;
    try {
      const umMunicipioParceiro = await database.cadastra_municipios.findOne({
        where: { cidade: cidade },
      });
      return res.status(200).json(umMunicipioParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaImgCity06(req, res) {
    try {
      const [results] = await database.sequelize.query(`
      SELECT DISTINCT ON (a.municipio_id)
        a.id, a.mimetype, a.path, a.municipio_id
      FROM anexo_municipios a
      JOIN (
        SELECT municipio_id
        FROM anexo_municipios
        GROUP BY municipio_id
        ORDER BY RANDOM()
        ) m ON a.municipio_id = m.municipio_id
        ORDER BY a.municipio_id, RANDOM();
    `);

      const imagensData = [];

      // console.log("Resultados da consulta:", results);

      for (const imagem of results) {
        const acesso = path.join(baseUrl, imagem.path);
        // console.log("Caminho:", acesso);
        // console.log("Existe?", fs.existsSync(acesso));
        if (!fs.existsSync(acesso)) continue;

        const data = fs.readFileSync(acesso, "base64");

        // Buscar dados da cidade (JOIN manual já que não usamos include)
        const municipio = await database.cadastra_municipios.findOne({
          where: { id: imagem.municipio_id },
          attributes: ["tipo_turismo"],
          include:[
            {
              association: "ass_cadastra_municipios_cidade",
              attributes: ["id", "nome_municipio"],
            },
            {
              association: "ass_cadastra_municipios_regiao",
              attributes: ["id", "nome"],
            }
          ]
        });

        imagensData.push({
          id: imagem.id,
          municipio_id: imagem.municipio_id,
          cidade: municipio?.ass_cadastra_municipios_cidade.nome_municipio,
          regiao: municipio?.ass_cadastra_municipios_regiao.nome,
          tipo_turismo: municipio?.tipo_turismo,
          mimetype: imagem.mimetype,
          base64: data,
        });
      }

      // console.log("Dados das imagens:", imagensData);

      return res.status(200).json(imagensData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar as imagens" });
    }
  }

  static async pegarMunicipioByTurismo(req, res) {
    const { turismo } = req.params;
    const imagensData = [];

    try {
      // Buscar todos os municípios com o tipo de turismo desejado
      const municipios = await database.cadastra_municipios.findAll({
        where: {
          tipo_turismo: {
            [Op.iLike]: `%${turismo}%`,
          },
        },
        attributes: ["id", "tipo_turismo"],
        include:[
            {
              association: "ass_cadastra_municipios_cidade",
              attributes: ["id", "nome_municipio"],
            },
            {
              association: "ass_cadastra_municipios_regiao",
              attributes: ["id", "nome"],
            }
          ]
      });

      // Para cada município, buscar 1 anexo aleatório e montar o objeto com base64
      for (const municipio of municipios) {
        const anexo = await database.anexo_municipio.findOne({
          where: {
            municipio_id: municipio.id,
          },
          order: [literal("RANDOM()")], // sorteia um
        });

        if (!anexo) continue; // ignora se não tiver imagem

        const caminhoImagem = path.join(baseUrl, anexo.path);
        if (!fs.existsSync(caminhoImagem)) continue; // ignora se arquivo não existir

        const base64 = fs.readFileSync(caminhoImagem, "base64");

        imagensData.push({
          id: anexo.id,
          municipio_id: anexo.municipio_id,
          cidade: municipio.ass_cadastra_municipios_cidade.nome_municipio,
          regiao: municipio.ass_cadastra_municipios_regiao.nome,
          tipo_turismo: municipio.tipo_turismo,
          mimetype: anexo.mimetype,
          base64: base64,
        });
      }

      return res.status(200).json(imagensData);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarImagensMunicipioParceiro(req, res) {
    const { id } = req.params;
    try {
      const results = await database.anexo_municipio.findAll({
        where: { municipio_id: id },
        order: [["filename", "ASC"]],
        attributes: ["id", "mimetype", "path", "municipio_id"],
      });

      const imagensData = [];

      for (const imagem of results) {
        const acesso = path.join(baseUrl, imagem.path);
        if (!fs.existsSync(acesso)) continue;

        const data = fs.readFileSync(acesso, "base64");

        // Buscar dados da cidade (JOIN manual já que não usamos include)
        const municipio = await database.cadastra_municipios.findOne({
          where: { id: imagem.municipio_id },
          attributes: ["tipo_turismo"],
          include:[
            {
              association: "ass_cadastra_municipios_cidade",
              attributes: ["id", "nome_municipio"],
            },
            {
              association: "ass_cadastra_municipios_regiao",
              attributes: ["id", "nome"],
            }
          ]
        });

        imagensData.push({
          id: imagem.id,
          municipio_id: imagem.municipio_id,
          cidade: municipio?.ass_cadastra_municipios_cidade.nome_municipio,
          regiao: municipio?.ass_cadastra_municipios_regiao.nome,
          tipo_turismo: municipio?.tipo_turismo,
          mimetype: imagem.mimetype,
          base64: data,
        });
      }

      return res.status(200).json(imagensData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar as imagens" });
    }
  }
}

module.exports = CadastroMunicipioController;
