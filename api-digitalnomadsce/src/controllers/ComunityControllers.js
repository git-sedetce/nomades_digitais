const database = require("../models");
const { Op } = require("sequelize");
const { Sequelize, QueryTypes, literal } = require("sequelize");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

class ComunityController {
  static async cadastraComunidade(req, res) {
  const novaComunidade = req.body;

  try {
    const criarComunidade = await database.Comunidade.create(novaComunidade);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novaComunidade.email_gestor, salt);

    const pin = Math.floor(1000 + Math.random() * 9000);
    const nome_usuario = novaComunidade.email_gestor.split("@")[0];

    await database.User.create({
      nome_completo: novaComunidade.gestor_comunidade,
      user_name: nome_usuario,
      user_email: novaComunidade.email_gestor,
      user_active: false,
      user_password: hashedPassword,
      user_pin: pin,
      profile_id: 4,
    });

    // -------- responde logo ao cliente --------
    res.status(200).json({
      message: "Comunidade cadastrada. Email sendo enviado...",
      comunidade: criarComunidade,
    });

    // -------- e dispara o email depois ----------

    const transporter = nodemailer.createTransport({
      host: "172.26.2.26",
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false },
    });

    transporter.sendMail({
      from: "digital.nomads@sedet.ce.gov.br",
      to: novaComunidade.email_gestor,
      subject: "Código PIN",
      html: `
        <h2>Código PIN</h2>
        <p>Segue o código PIN para o acesso da plataforma Digital Nomads CE.</p>
        <br><p><strong>${pin}</strong></p>
        <p><a href="https://www.digitalnomads.ce.gov.br/admin/resetSenha">Clique aqui</a> para criar sua senha</p>
      `,
    }, (err, info) => {
      if (err) console.error("Erro ao enviar email:", err);
      else console.log("Email enviado:", info.response);
    });

  } catch (error) {
    // console.log(error);
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
        attributes: ["id", "name"],
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
        attributes: [
          "id",
          "name",
          "descricao",
          "historia",
          "data_criacao",
          "idioma",
          "regras_convivencia",
          "gestor_comunidade",
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
      const mostraMidia = await database.ConectComunidade.findAll({
        where: { comunidade_id: Number(id) },
        attributes: ["id", "plataforma", "acesso_midia"],
        include: [
          {
            model: database.Comunidade,
            as: "ass_conect_comunity",
            attributes: ["name"],
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
      const mostraEncontros = await database.EncontrosComunidade.findAll({
        where: { comunidade_id: Number(id) },
        attributes: [
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
          "estado",
          "plataforma",
          "link",
        ],
        include: [
          {
            model: database.Comunidade,
            as: "ass_meet_comunity",
            attributes: ["name"],
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
