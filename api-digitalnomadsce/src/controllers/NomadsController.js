const database = require("../models");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

class NomadsController {
  static async cadastraNomads(req, res) {
    const email_grupo = "admdigitalnomads@sde.ce.gov.br";
    const novoNomads = req.body;
    console.log("novoNomads", novoNomads);

    try {
      // 🔹 Criação do Nomad principal
      const criarNomads = await database.cadastra_nomads.create({
        name: novoNomads.name,
        lastName: novoNomads.lastName,
        nomad_email: novoNomads.nomad_email,
        contato_nomad: novoNomads.contato_nomad,
        cidade: novoNomads.cidade,
        regiao: novoNomads.regiao,
        country: novoNomads.country,
        shared_info: novoNomads.shared_info,
        nomads_news: novoNomads.nomads_news,
        suggestion: novoNomads.suggestion,
        first_time_ce: novoNomads.first_time_ce,
        data_nascimento: novoNomads.data_nascimento,
        passaporte: novoNomads.passaporte,
        motivo_viagem: novoNomads.motivo_viagem,
        know_how: novoNomads.know_how,
        profissao: novoNomads.profissao,
        possui_empresa: novoNomads.possui_empresa,
      });

      // 🔹 Criação da empresa vinculada (verifica se há dados válidos)
      if (novoNomads.company_name) {
        await database.empresaNomade.create({
          nome_empresa: novoNomads.company_name,
          cnpj: novoNomads.registro,
          setor: novoNomads.setor,
          site: novoNomads.site,
          nomad_id: criarNomads.id,
        });
      }

      // 🔹 Criação do usuário com senha hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(novoNomads.nomad_email, salt);
      const pin = Math.floor(1000 + Math.random() * 9000);
      const nome_usuario = novoNomads.nomad_email.split("@")[0];

      await database.User.create({
        nome_completo: `${novoNomads.name} ${novoNomads.lastName}`,
        user_name: nome_usuario,
        user_email: novoNomads.nomad_email,
        user_active: false,
        user_password: hashedPassword,
        user_pin: pin,
        profile_id: 1,
      });

      // 🔹 Configuração do transporte de e-mail
      const transporter = nodemailer.createTransport({
        host: "172.26.2.26", // ou "relay.etice.ce.gov.br"
        port: 25,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      });

      // 🔹 Mensagem de boas-vindas
      const mailOptions = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: [novoNomads.nomad_email, email_grupo],
        subject: "Cadastro Nomads",
        html: `
        <h2>Parabéns!</h2>
        <p>O cadastro do Nomad Digital foi realizado com sucesso.</p>
        <ul>
          <li><strong>Nome:</strong> ${novoNomads.name} ${novoNomads.lastName}</li>
          <li><strong>Contato:</strong> ${novoNomads.contato_nomad}</li>
          <li><strong>Email:</strong> ${novoNomads.nomad_email}</li>
          <li><strong>Cidade:</strong> ${novoNomads.cidade}</li>
          <li><strong>Região:</strong> ${novoNomads.regiao}</li>
          <li><strong>País:</strong> ${novoNomads.country}</li>
          <li><strong>Dividir informações:</strong> ${novoNomads.shared_info}</li>
          <li><strong>Envio de notícias:</strong> ${novoNomads.nomads_news}</li>
        </ul>
        <p>Caso a sua inscrição seja deferida, os dados acima informados poderão ser conferidos no site do projeto.</p>
        <p>Atenciosamente,<br><strong>Equipe Digital Nomads CE</strong></p>
      `,
      };

      // 🔹 E-mail com PIN
      const mailOptionsPin = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: novoNomads.nomad_email,
        subject: "Código PIN - Digital Nomads CE",
        html: `
        <h2>Código PIN</h2>
        <p>Segue o código PIN para o acesso à plataforma Digital Nomads CE:</p>
        <h3 style="color: #2b6cb0;">${pin}</h3>
        <p><a href="https://www.digitalnomads.ce.gov.br/admin/resetSenha">Clique aqui</a> para criar sua senha.</p>
      `,
      };

      // 🔹 Envio de e-mails (forma mais confiável com async/await)
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(mailOptionsPin);

      return res.status(200).json({
        message: "Cadastro realizado com sucesso!",
        nomad: criarNomads,
      });
    } catch (error) {
      console.error("Erro ao cadastrar Nomad:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async cadastraCompany(req, res) {
    const { id } = req.params;
    const newComapny = req.body;
    // console.log('newComapny', newComapny)

    try {
      const criarCompany = await database.empresaNomade.create({
        nome_empresa: newComapny.company_name,
        setor: newComapny.setor,
        cnpj: newComapny.registro,
        site: newComapny.site,
        nomad_id: Number(id),
      });
      // Atualização na tabela cadastra_nomads
      await database.cadastra_nomads.update(
        { possui_empresa: "sim" }, // Primeiro argumento: campos a serem atualizados
        { where: { id: Number(id) } } // Segundo argumento: condição (where)
      );
      return res.status(200).json(criarCompany);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateCompanyNomad(req, res) {
    const { id } = req.params;
    const updateInfos = req.body;
    try {
      await database.empresaNomade.update(
        {
          nome_empresa: updateInfos.company_name,
          setor: updateInfos.setor,
          cnpj: updateInfos.registro,
          site: updateInfos.site,
        },
        {
          where: { nomad_id: Number(id) },
        }
      );
      const updateCompany = await database.empresaNomade.findOne({
        where: { nomad_id: Number(id) },
      });
      return res.status(200).json(updateCompany);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async pegaTodosNomads(req, res) {
    try {
      const todosNomads = await database.cadastra_nomads.findAll({
        attributes: [
          "id",
          "name",
          "lastName",
          "nomad_email",
          "contato_nomad",
          "cidade",
          "regiao",
          "country",
          "shared_info",
          "nomads_news",
          "possui_empresa",
          "suggestion",
          "first_time_ce",
          "data_nascimento",
          "passaporte",
          "motivo_viagem",
          "know_how",
          "profissao",
          "possui_empresa",
        ],
        order: [["name", "ASC"]],
      });
      return res.status(200).json(todosNomads);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmNomad(req, res) {
    const { id } = req.params;
    try {
      const umNomad = await database.cadastra_nomads.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umNomad);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async nomadByEmail(req, res) {
    const { email } = req.params;
    try {
      const email_nomad = await database.cadastra_nomads.findOne({
        where: { nomad_email: email },
      });
      if (email_nomad === null) {
        return res
          .status(200)
          .json({ mensagem: `Email autorizado para cadastro` });
      } else {
        return res.status(200).json({ mensagem: `Email já cadastrado!` });
      }
      // return res.status(200).json(parceiro_cnpj);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async nomadEmail(req, res) {
    const { email } = req.params;
    try {
      const email_nomad = await database.cadastra_nomads.findOne({
        where: { nomad_email: email },
        include: [
          {
            association: "ass_nomade_empresa",
            where: (database.empresaNomade.nomad_id =
              database.cadastra_nomads.id),
            attributes: ["id", "nome_empresa", "cnpj", "setor", "site"],
          },
        ],
      });
      return res.status(200).json(email_nomad);
      // return res.status(200).json(parceiro_cnpj);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async nomadBycnpj(req, res) {
    const { cnpj } = req.params;
    try {
      const nomad_cnpj = await database.cadastra_nomads.findOne({
        where: { cnpj: cnpj },
      });
      if (nomad_cnpj === null) {
        return res
          .status(200)
          .json({ mensagem: `CNPJ autorizado para cadastro` });
      } else {
        return res.status(200).json({ mensagem: `CNPJ já cadastrado!` });
      }
      // return res.status(200).json(parceiro_cnpj);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaNomad(req, res) {
    const { id } = req.params;
    const updateInfos = req.body;
    try {
      await database.cadastra_nomads.update(updateInfos, {
        where: { id: Number(id) },
      });
      const updateNomads = await database.cadastra_nomads.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updateNomads);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaNomad(req, res) {
    const { id } = req.params;
    try {
      await database.cadastra_nomads.destroy({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `O Nomad de id ${id} foi deletado com sucesso` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restauraNomad(req, res) {
    const { id } = req.params;
    try {
      await database.cadastra_nomads.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ mensage: `O Nomad de id ${id} foi restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NomadsController;
