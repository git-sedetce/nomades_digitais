const database = require("../models");
const nodemailer = require("nodemailer");
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
    console.log("newJobNomad", newJobNomad);

    try {
      // 1. Criação da vaga no banco
      const criarVaga = await database.Emprego_Nomad.create({
        vaga_id: newJobNomad.vaga_id,
        nomad_id: newJobNomad.nomad_id,
      });

      // 2. Configuração do transporte de e-mail
      const transporter = nodemailer.createTransport({
        host: "172.26.2.26", // ou "relay.etice.ce.gov.br"
        port: 25,
        secure: false,
        tls: { rejectUnauthorized: false },
      });

      // 3. Conteúdo do e-mail
      const mailOptions = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: newJobNomad.mail_company, // e-mail da empresa
        subject: "Interesse na vaga de emprego",
        html: `
        <h2>Candidato para a vaga!</h2>
        <p>O nomad <b>${newJobNomad.nomad_name}</b> tem interesse na vaga <b>${newJobNomad.nomeVaga}</b>.</p>
        <p>Segue abaixo o contato do candidato:</p>
        <ul>
          <li>Email: ${newJobNomad.email}</li>
          <li>Telefone: ${newJobNomad.telefone}</li>
          <li>Mensagem: ${newJobNomad.mensagem}</li>
        </ul>
      `,
      };

      // 4. Envio do e-mail (aguardando resultado)
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado:", info.response);

        return res.status(200).json({
          vaga: criarVaga,
          email: {
            mensagem: "Email enviado com sucesso!",
            info: info.response,
          },
        });
      } catch (emailError) {
        console.error("Erro ao enviar e-mail:", emailError);
        return res.status(201).json({
          vaga: criarVaga,
          email: {
            mensagem: "Vaga criada, mas o e-mail falhou.",
            erro: emailError,
          },
        });
      }
    } catch (error) {
      console.error("Erro geral:", error);
      return res.status(500).json({ erro: error.message });
    }
  }

  static async getjobs(req, res) {
    try {
      const vagas = await database.Vagas_Emprego.findAll({
        attributes: ["id", "nome_vaga", "descricao", "status"],
        include: [
          {
            model: database.cadastra_parceiros,
            as: "ass_vagas_parceiro",
            attributes: ["cnpj", "nome_fantasia", "email_parceiro"],
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
            attributes: ["cnpj", "nome_fantasia", "email_parceiro"],
          },
        ],
      });
      return res.status(200).json(mostraComunidade);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async vagaPorEmpresa(req, res) {
    const { id } = req.params;
    try {
      const mostraComunidade = await database.Vagas_Emprego.findAll({
        where: { parceiro_id: Number(id) },
        attributes: ["id", "nome_vaga", "descricao", "status"],
        order: [["updatedAt", "ASC"]],
        include: [
          {
            model: database.cadastra_parceiros,
            as: "ass_vagas_parceiro",
            attributes: ["cnpj", "nome_fantasia"],
          },
        ],
      });
      return res.status(200).json(mostraComunidade);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateVaga(req, res) {
    const { id } = req.params;
    const updateInfos = req.body;
    console.log(updateInfos);
    try {
      await database.Vagas_Emprego.update(
        {
          parceiro_id: updateInfos.parceiro_id,
          nome_vaga: updateInfos.nome_vaga,
          descricao: updateInfos.descricao,
          status: updateInfos.status,
        },
        {
          where: { id: Number(id) },
        }
      );
      const updateVaga = await database.Vagas_Emprego.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updateVaga);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async apagaVaga(req, res) {
    const { id } = req.params;
    try {
      await database.Vagas_Emprego.destroy({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `A vaga de id ${id} foi deletado com sucesso` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = VagasEmpregoController;
