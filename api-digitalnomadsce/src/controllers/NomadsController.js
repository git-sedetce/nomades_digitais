const database = require("../models");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')

class NomadsController {
  static async cadastraNomads(req, res) {
    var email_grupo = "admdigitalnomads@sde.ce.gov.br";
    const novoNomads = req.body;
    // console.log('novoNomads', novoNomads)

    try {
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

      await database.empresaNomade.create({
        nome_empresa: novoNomads.company_name,
        cnpj: novoNomads.registro,
        setor: novoNomads.setor,
        site: novoNomads.site,
        nomad_id: criarNomads.id,
      })

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(novoNomads.nomad_email, salt);
      const pin = Math.floor(1000 + Math.random() * 9000);
      const nome_usuario = novoNomads.nomad_email.split("@")

      await database.User.create({
        nome_completo: novoNomads.name + " "+ novoNomads.lastName,
        user_name: nome_usuario[0],
        user_email: novoNomads.nomad_email,
        user_active: false,
        user_password: hashedPassword,
        user_pin: pin,
        profile_id: 1,
      });

      var transporter = nodemailer.createTransport({
        host: "172.26.2.26", //"relay.etice.ce.gov.br",
        port: 25,
        secure: false,
        /*auth: {
                user: "digital.nomads@sedet.ce.gov.br",
                pass: "@Sedet2022",
              },*/
        tls: {
          rejectUnauthorized: false,
        },
      });
      var email = novoNomads.nomad_email;
      var enviarEmail = [email, email_grupo];
      var mailOptions = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: enviarEmail,
        subject: "Cadastro Nomads",
        html: `<h2>Parabéns!</h2><p>Parabéns! O cadastro do Nomad Digital foi realizado com sucesso.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>Nome: ${novoNomads.name}</li><li>Sobrenome: ${novoNomads.lastName}</li><li>Contato: ${novoNomads.contato_nomad}</li><li>Email: ${novoNomads.nomad_email}</li><li>Cidade: ${novoNomads.cidade}</li><li>Região: ${novoNomads.regiao}</li><li>País: ${novoNomads.country}</li><li>Data de partida: ${novoNomads.departure_date}</li><li>Dividir informações: ${novoNomads.shared_info}</li><li>Envio de notícias: ${novoNomads.nomads_news}</li><li>Sugestões: ${novoNomads.suggestion}</li></ul><p>Caso a sua inscrição seja deferida, os dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong>.</p><p>Agradecemos a participação, espero que curta o nosso Ceará, aproveite!!!!</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>admdigitalnomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`,
        //text: `Prezado(a) seu cadastro foi realizado com sucesso!!!`,
      };

      var mailOptionsPin = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: novoNomads.nomad_email,
        subject: "Código PIN",
        html:`<h2>Código PIN</h2><p>Segue o código PIN para o acesso da plataforma Digital Nomads CE.</p><br><p><strong>${pin}</strong></p>
        <p><a href="https://www.digitalnomads.ce.gov.br/resetSenha">Clique aqui</a> para criar sua senha</p>`
        //text: `Prezado(a) seu cadastro foi realizado com sucesso!!!`,
      };

      // console.log("mailOptions", mailOptions);
      var emailRetorno = null;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          emailRetorno = error;
        } else {
          // console.log("Email sent: " + info.response);
          emailRetorno = {
            messagem: "Email enviado com sucesso!",
            info: info.response,
          };
        }
      });
      
      transporter.sendMail(mailOptionsPin, function (error, info) {
        if (error) {
          console.log(error);
          emailRetorno = error;
        } else {
          // console.log("Email sent: " + info.response);
          emailRetorno = {
            messagem: "PIN enviado com sucesso!",
            info: info.response,
          };
        }
      });

      return res.status(200).json(criarNomads);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraCompany(req, res) { 
    const { id } = req.params;   
    const newComapny = req.body;
    // console.log('newComapny', newComapny)

    try {
      const criarCompany = await database.empresaNomade.create(
        {
        nome_empresa: newComapny.company_name,
        setor: newComapny.setor,
        cnpj: newComapny.registro,
        site: newComapny.site,
        nomad_id: Number(id),        
      }
    );    
     // Atualização na tabela cadastra_nomads
     await database.cadastra_nomads.update(
      { possui_empresa: 'sim' }, // Primeiro argumento: campos a serem atualizados
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
      await database.empresaNomade.update({        
        nome_empresa: updateInfos.company_name,
        setor: updateInfos.setor,
        cnpj: updateInfos.registro,
        site: updateInfos.site,
      },
      {
        where: { nomad_id: Number(id) },
      });
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
        attributes: ["id", "name", "lastName", "nomad_email", "contato_nomad", "cidade", "regiao", "country", "shared_info", "nomads_news", "possui_empresa", "suggestion", "first_time_ce", "data_nascimento", "passaporte", "motivo_viagem", "know_how", "profissao", "possui_empresa"],
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
            where: (database.empresaNomade.nomad_id = database.cadastra_nomads.id),
            attributes: ["id", "nome_empresa", "cnpj", "setor", "site"],
          }
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
