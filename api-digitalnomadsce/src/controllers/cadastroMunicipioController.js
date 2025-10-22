const database = require("../models");
const nodemailer = require("nodemailer");
const path = require("path");
const baseUrl = process.cwd(); //+ "/src"; __dirname + '.
const fs = require("fs");
const { Sequelize, Op, literal } = require("sequelize");
const bcrypt = require("bcryptjs");

class CadastroMunicipioController {
  static async cadastraMunicipioParceiro(req, res) {
    var email_grupo = "admdigitalnomads@sedet.ce.gov.br";
    const novoMunicipioParceiro = req.body;
    console.log(novoMunicipioParceiro);
    try {
      const criarMunicipioParceiro = await database.cadastra_municipios.create(
        novoMunicipioParceiro
      );

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(novoMunicipioParceiro.email_prefeitura, salt);
      const pin = Math.floor(1000 + Math.random() * 9000);
      const nome_usuario = novoMunicipioParceiro.email_prefeitura.split("@");

      await database.User.create({
        nome_completo: novoMunicipioParceiro.cidade,
        user_name: nome_usuario[0],
        user_email: novoMunicipioParceiro.email_prefeitura,
        user_active: false,
        user_password: hashedPassword,
        user_pin: pin,
        profile_id: 5,
      });

      res.status(200).json({
        message: "Município cadastrado. Email sendo enviado...",
        municipio: criarMunicipioParceiro,
      })
      
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
      var email = novoMunicipioParceiro.email_prefeitura;
      var enviarEmail = [email, email_grupo];
      var mailOptions = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: enviarEmail, //novoMunicipioParceiro.email_prefeitura
        subject: "Cadastro Municipio",
        html: `<h2>Parabéns!</h2><p>O cadastro do seu município foi realizado com sucesso. Agora você faz parte do Projeto Digital Nomads CE e o seu município está apto a receber os Nômades Digitais.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>Cidade: ${novoMunicipioParceiro.cidade}</li><li>Região: ${novoMunicipioParceiro.regiao}</li><li>Email: ${novoMunicipioParceiro.email_prefeitura}</li><li>Contato: ${novoMunicipioParceiro.contato_prefeitura}</li><li>Link: ${novoMunicipioParceiro.link_prefeitura}</li><li>História: ${novoMunicipioParceiro.historia_cidade}</li><li>Serviço de Wifi: ${novoMunicipioParceiro.wifi_service}</li><li>Wifi da cidade: ${novoMunicipioParceiro.wifi_cidade}</li><li>Serviço para estrangeiro: ${novoMunicipioParceiro.service_estrangeiro}</li><li>Serviço da cidade: ${novoMunicipioParceiro.service_cidade}</li><li>Serviço para empresário: ${novoMunicipioParceiro.service_empresario}</li><li>Serviço de segurança: ${novoMunicipioParceiro.service_seguranca}</li><li>Pontos turísticos: ${novoMunicipioParceiro.pontos_turisticos}</li><li>Espaços Culturais: ${novoMunicipioParceiro.espacos_culturais}</li><li>Espaços de lazer: ${novoMunicipioParceiro.espacos_lazer}</li><li>Tipo de turismo: ${novoMunicipioParceiro.tipo_turismo}</li><li>Turismo Ecolológico: ${novoMunicipioParceiro.tourism_ecologico}</li><li>Turismo Praiano: ${novoMunicipioParceiro.tourism_praiano}</li><li>Turismo Radical: ${novoMunicipioParceiro.tourism_radical}</li><li>Turismo Religioso: ${novoMunicipioParceiro.tourism_religioso}</li><li>Turismo Serrano: ${novoMunicipioParceiro.tourism_serrano}</li><li>Turismo Sertanejo: ${novoMunicipioParceiro.tourism_sertanejo}</li><li>Rota: ${novoMunicipioParceiro.rota}</li><li>Qual rota: ${novoMunicipioParceiro.qual_rota}</li></ul><p>Em breve esses dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong>.</p><p>Agradecemos a participação do seu município nesse mais novo projeto e contamos com a sua colaboração para tornar o Ceará um polo para os Nômades Digitais</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>admdigitalnomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`,
      };

      // console.log("mailOptions", mailOptions);
      var emailRetorno = null;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          emailRetorno = error;
        } else {
          console.log("Email sent: " + info.response);
          emailRetorno = {
            messagem: "email enviado com sucesso!",
            info: info.response,
          };
        }
      });

      var mailOptionsPin = {
        from: "digital.nomads@sedet.ce.gov.br",
        to: novoMunicipioParceiro.email_prefeitura,
        subject: "Código PIN",
        html: `<h2>Código PIN</h2><p>Segue o código PIN para o acesso da plataforma Digital Nomads CE.</p><br><p><strong>${pin}</strong></p>
                  <p><a href="https://www.digitalnomads.ce.gov.br/admin/resetSenha">Clique aqui</a> para criar sua senha</p>`,
        //text: `Prezado(a) seu cadastro foi realizado com sucesso!!!`,
      };

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
    } catch (error) {
      return res.status(500).json(error.message);
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

  static async anexosMunicipioParceiro(req, res) {
    //var email_grupo = "admdigitalnomads@sedet.ce.gov.br"
    var name_arquivo = [];
    const file = req.files;
    const { id } = req.params;
    //console.log(file)
    if (file.length > 0) {
      for (let img = 0; img < file.length; img++) {
        const caminho = file[img].path;
        const nome_arquivo = file[img].filename;
        const type = file[img].mimetype;
        name_arquivo.push(nome_arquivo);
        //console.log(file[img].originalname)
        const anexarMunicipio = await database.anexo_municipio.create({
          mimetype: type,
          filename: nome_arquivo,
          path: caminho,
          municipio_id: id,
        });

        //console.log(res.status(200).json(anexarMunicipio));
      }
      //console.log('name_arquivo', name_arquivo)
      return res.status(200).json({ message: "Anexo enviado com Sucesso!" });
    } else {
      return res.status(500).json(error.message);
    }
    /*
        if(file){
          res.json(file)
        }else{
          throw new Error("File upload unseccessful")
        }*/
    //res.send("Arquivo recebido!")
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
        LIMIT 6
        ) m ON a.municipio_id = m.municipio_id
        ORDER BY a.municipio_id, RANDOM();
    `);

      const imagensData = [];

      for (const imagem of results) {
        const acesso = path.join(baseUrl, imagem.path);
        if (!fs.existsSync(acesso)) continue;

        const data = fs.readFileSync(acesso, "base64");

        // Buscar dados da cidade (JOIN manual já que não usamos include)
        const municipio = await database.cadastra_municipios.findOne({
          where: { id: imagem.municipio_id },
          attributes: ["cidade", "regiao", "tipo_turismo"],
        });

        imagensData.push({
          id: imagem.id,
          municipio_id: imagem.municipio_id,
          cidade: municipio?.cidade,
          regiao: municipio?.regiao,
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
        attributes: ["id", "cidade", "regiao", "tipo_turismo"],
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
          cidade: municipio.cidade,
          regiao: municipio.regiao,
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
}

module.exports = CadastroMunicipioController;
