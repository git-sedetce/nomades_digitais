const database = require("../models");
const nodemailer = require("nodemailer");
const { Sequelize, QueryTypes, where } = require("sequelize");
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd(); //+ "/src"; __dirname + '.
const bcrypt = require("bcryptjs");

class ParceiroController {
  static async pegarParceiro(req, res) {
    try {
      const mostraParceiro = await database.cadastra_parceiros.findAll({
        order: ["nome_fantasia"],
      });
      return res.status(200).json(mostraParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarHospedagem(req, res) {
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        where: { tipo_service: "hospedagem" },
        order: ["nome_fantasia"],
        include: [
          {
            model: database.anexos,
            as: "ass_imgsParceiros",
            attributes: ["mimetype", "path", "tipo_anexo"],
            where: { tipo_anexo: "logo" },
            required: false, // se quiser trazer mesmo que não tenha logo
          },
        ],
      });
      // Montar o retorno com os dados + logo em base64
      const resultado = await Promise.all(
        parceiros.map(async (parceiro) => {
          let logoBase64 = null;

          if (
            parceiro.ass_imgsParceiros &&
            parceiro.ass_imgsParceiros.length > 0
          ) {
            const logoPath = path.join(
              baseUrl,
              parceiro.ass_imgsParceiros[0].path,
            );
            try {
              const buffer = await fs.promises.readFile(logoPath);
              logoBase64 = buffer.toString("base64");
            } catch (err) {
              console.error("Erro ao ler imagem:", err);
            }
          }

          return {
            ...parceiro.toJSON(),
            logo: logoBase64, // adiciona a logo convertida
          };
        }),
      );

      return res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async pegarTipoHospedagem(req, res) {
    const { tipo } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        where: { tipo_estabelecimento: tipo },
        order: ["nome_fantasia"],
        include: [
          {
            model: database.anexos,
            as: "ass_imgsParceiros",
            attributes: ["mimetype", "path", "tipo_anexo"],
            where: { tipo_anexo: "logo" },
            required: false, // se quiser trazer mesmo que não tenha logo
          },
        ],
      });
      // Montar o retorno com os dados + logo em base64
      const resultado = await Promise.all(
        parceiros.map(async (parceiro) => {
          let logoBase64 = null;

          if (
            parceiro.ass_imgsParceiros &&
            parceiro.ass_imgsParceiros.length > 0
          ) {
            const logoPath = path.join(
              baseUrl,
              parceiro.ass_imgsParceiros[0].path,
            );
            try {
              const buffer = await fs.promises.readFile(logoPath);
              logoBase64 = buffer.toString("base64");
            } catch (err) {
              console.error("Erro ao ler imagem:", err);
            }
          }

          return {
            ...parceiro.toJSON(),
            logo: logoBase64, // adiciona a logo convertida
          };
        }),
      );

      return res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async pegarCoworking(req, res) {
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        where: { tipo_service: "local_trabalho" },
        order: ["nome_fantasia"],
        include: [
          {
            model: database.anexos,
            as: "ass_imgsParceiros",
            attributes: ["mimetype", "path", "tipo_anexo"],
            where: { tipo_anexo: "logo" },
            required: false, // se quiser trazer mesmo que não tenha logo
          },
        ],
      });
      // Montar o retorno com os dados + logo em base64
      const resultado = await Promise.all(
        parceiros.map(async (parceiro) => {
          let logoBase64 = null;

          if (
            parceiro.ass_imgsParceiros &&
            parceiro.ass_imgsParceiros.length > 0
          ) {
            const logoPath = path.join(
              baseUrl,
              parceiro.ass_imgsParceiros[0].path,
            );
            try {
              const buffer = await fs.promises.readFile(logoPath);
              logoBase64 = buffer.toString("base64");
            } catch (err) {
              console.error("Erro ao ler imagem:", err);
            }
          }

          return {
            ...parceiro.toJSON(),
            logo: logoBase64, // adiciona a logo convertida
          };
        }),
      );

      return res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async pegarGstronomia(req, res) {
    const { place } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        where: { tipo_estabelecimento: place },
        order: ["nome_fantasia"],
        include: [
          {
            model: database.anexos,
            as: "ass_imgsParceiros",
            attributes: ["mimetype", "path", "tipo_anexo"],
            where: { tipo_anexo: "logo" },
            required: false, // se quiser trazer mesmo que não tenha logo
          },
        ],
      });
      // Montar o retorno com os dados + logo em base64
      const resultado = await Promise.all(
        parceiros.map(async (parceiro) => {
          let logoBase64 = null;

          if (
            parceiro.ass_imgsParceiros &&
            parceiro.ass_imgsParceiros.length > 0
          ) {
            const logoPath = path.join(
              baseUrl,
              parceiro.ass_imgsParceiros[0].path,
            );
            try {
              const buffer = await fs.promises.readFile(logoPath);
              logoBase64 = buffer.toString("base64");
            } catch (err) {
              console.error("Erro ao ler imagem:", err);
            }
          }

          return {
            ...parceiro.toJSON(),
            logo: logoBase64, // adiciona a logo convertida
          };
        }),
      );

      return res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async parceiroById(req, res) {
    const { id } = req.params;
    try {
      const umParceiro = await database.cadastra_parceiros.findOne({
        where: { id: Number(id) },
        include: [
          {
            association: "ass_imgsParceiros",
            where: (database.cadastra_parceiros.id =
              database.anexos.parceiro_id),
            attributes: ["mimetype", "path"],
          },
        ],
        //raw: true,
      });
      // console.log('Parceiro', umParceiro)
      return res.status(200).json(umParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async parceiroByMail(req, res) {
    const { email } = req.params;
    try {
      const umParceiro = await database.cadastra_parceiros.findOne({
        where: { email_parceiro: email },
        include: [
          {
            association: "ass_imgsParceiros",
            where: (database.cadastra_parceiros.id =
              database.anexos.parceiro_id),
            attributes: ["mimetype", "path"],
          },
        ],
        //raw: true,
      });
      // console.log('Parceiro', umParceiro)
      return res.status(200).json(umParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async parceiroByService(req, res) {
    const { service } = req.params;
    try {
      const parceiroByService = await database.cadastra_parceiros.findAll({
        where: { tipo_service: service },
        //raw: true,
      });
      // console.log('Parceiro', parceiroByService)
      return res.status(200).json(parceiroByService);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarBairros(req, res) {
    // const { bairro } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        // where: { bairro: bairro },
        attributes: [
          [
            Sequelize.fn("MAX", Sequelize.col("cadastra_parceiros.id")),
            "cadastra_parceiros.id",
          ],
          "bairro",
        ],
        group: ["bairro"],
      });
      return res.status(200).json(parceiros);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarParceiros(req, res) {
    // const { bairro } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        // where: { bairro: bairro },
        attributes: [
          [Sequelize.fn("MAX", Sequelize.col("cadastra_parceiros.id")), "id"],
          "cnpj",
          "nome_fantasia",
        ],
        group: ["cnpj", "nome_fantasia"],
        order: ["nome_fantasia"],
      });
      return res.status(200).json(parceiros);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarCidades(req, res) {
    // const { bairro } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        // where: { bairro: bairro },
        attributes: [
          [
            Sequelize.fn("MAX", Sequelize.col("cadastra_parceiros.id")),
            "cadastra_parceiros.id",
          ],
          "cidade",
        ],
        group: ["cidade"],
      });
      return res.status(200).json(parceiros);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async partnerByNeighborhood(req, res) {
    const { bairro } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        where: { bairro: bairro },
      });
      return res.status(200).json(parceiros);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async partnerByCity(req, res) {
    const { city } = req.params;
    try {
      const parceiros = await database.cadastra_parceiros.findAll({
        where: { cidade: city },
      });
      return res.status(200).json(parceiros);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async parceiroByCnpj(req, res) {
    const { cnpj } = req.params;
    try {
      const parceiro_cnpj = await database.cadastra_parceiros.findOne({
        where: { cnpj: cnpj },
      });
      if (parceiro_cnpj === null) {
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

  static async cadastraParceiro(req, res) {
    const transaction = await database.sequelize.transaction();

    try {
      const dados = JSON.parse(req.body.dados);

      const comprovante = req.files?.comprovante?.[0];

      const alvara = req.files?.alvara?.[0];

      const logo = req.files?.logo?.[0];

      const imagens = req.files?.imagens || [];

      // =========================
      // CRIA PARCEIRO
      // =========================

      const criarParceiro = await database.cadastra_parceiros.create(dados, {
        transaction,
      });

      // =========================
      // CRIA USUÁRIO
      // =========================

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(dados.email_parceiro, salt);

      const pin = Math.floor(1000 + Math.random() * 9000);

      const nome_usuario = dados.email_parceiro.split("@");

      await database.User.create(
        {
          nome_completo: dados.nome_fantasia,

          user_name: nome_usuario[0],

          user_email: dados.email_parceiro,

          user_active: false,

          user_password: hashedPassword,

          user_pin: pin,

          profile_id: 2,
        },
        { transaction },
      );

      // =========================
      // SALVAR ANEXOS
      // =========================

      async function salvarArquivo(arquivo, tipo) {
        if (!arquivo) return;

        const caminho = arquivo.path.split(process.env.SPLIT)[1];

        await database.anexos.create(
          {
            mimetype: arquivo.mimetype,

            filename: arquivo.filename,

            path: caminho,

            parceiro_id: criarParceiro.id,

            tipo_anexo: tipo,
          },
          { transaction },
        );
      }

      // comprovante
      await salvarArquivo(comprovante, "comprovante");

      // alvará
      await salvarArquivo(alvara, "alvara");

      // logo
      await salvarArquivo(logo, "logo");

      // imagens
      for (const imagem of imagens) {
        await salvarArquivo(imagem, "image");
      }

      // =========================
      // EMAILS
      // =========================

      const email_grupo = "admdigitalnomads@sedet.ce.gov.br";

      const transporter = nodemailer.createTransport({
        host: "172.26.2.26",

        port: 25,

        secure: false,

        tls: {
          rejectUnauthorized: false,
        },
      });

      const enviarEmail = [dados.email_parceiro, email_grupo];

      const mailOptions = {
        from: "digital.nomads@sedet.ce.gov.br",

        to: enviarEmail,

        subject: "Cadastro Parceiro",

        html: `<h2>Parabéns!</h2><p>Parabéns! O cadastro da sua empresa foi realizado com sucesso. Os dados enviados pela sua empresa serão analisados e em breve você receberá o retorno da sua inscrição e poderá fazer parte do Projeto Digital Nomads CE, atraindo um novo público para o seu estabelecimento.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>CNPJ: ${dados.cnpj}</li><li>Nome fantasia: ${dados.nome_fantasia}</li><li>Razão Social: ${dados.razao_social}</li><li>Contato: ${dados.telefone}</li><li>CEP: ${dados.cep}</li><li>Logradouro: ${dados.logradouro}</li><li>Número: ${dados.numero}</li><li>Complemento: ${dados.complemento}</li><li>Bairro: ${dados.bairro}</li><li>Cidade: ${dados.cidade}</li><li>Estado: ${dados.estado}</li><li>Email: ${dados.email_parceiro}</li><li>Mídia Social: ${dados.midia_social}</li><li>Tipo de Serviço: ${dados.tipo_service}</li><li>Serviços essenciais: ${dados.essential_service}</li><li>Serviço de internet: ${dados.internet_service}</li><li>Outro serviço: ${dados.outro_servico}</li><li>Reuniões: ${dados.trabalho_reunioes}</li><li>Orientação: ${dados.orienta_equipe}</li><li>Localização: ${dados.localizacao}</li><li>Ramo: ${dados.ramo}</li><li>Benefícios: ${dados.beneficios}</li><li>Espaços Culturais: ${dados.espacos_culturais}</li><li>Idioma: ${dados.idioma}</li><li>Qual Idioma: ${dados.qual_idioma}</li></ul><p>Caso a sua inscrição seja deferida, os dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong> ou <strong>Parceiros</strong>.</p><p>Agradecemos a participação da sua empresa nesse mais novo projeto e contamos com a sua colaboração para tornar o Ceará um polo para os Nômades Digitais.</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>admdigitalnomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`,
      };

      const mailOptionsPin = {
        from: "digital.nomads@sedet.ce.gov.br",

        to: dados.email_parceiro,

        subject: "Código PIN",

        html: `<h2>Código PIN</h2><p>Segue o código PIN para o acesso da plataforma Digital Nomads CE.</p><br><p><strong>${pin}</strong></p>
            <p><a href="https://www.digitalnomads.ce.gov.br/resetSenha">Clique aqui</a> para criar sua senha</p>`,
      };

      transporter.sendMail(mailOptions);

      transporter.sendMail(mailOptionsPin);

      // =========================
      // COMMIT
      // =========================

      await transaction.commit();

      return res.status(201).json({
        message: "Parceiro cadastrado com sucesso!",

        parceiro_id: criarParceiro.id,
      });
    } catch (error) {
      await transaction.rollback();

      console.log(error);

      return res.status(500).json({
        message: "Erro ao cadastrar parceiro",

        error: error.message,
      });
    }
  }

  static async pegaLogoByID(req, res) {
    const { id } = req.params;
    try {
      const logoParceiro = await database.anexos.findOne({
        where: { parceiro_id: Number(id), tipo_anexo: "logo" },
        attributes: ["path"],
      });
      if (!logoParceiro) {
        return res.status(404).send({
          message: "Imagem não encontrada",
        });
      }

      const acesso = path.join(baseUrl, logoParceiro.path);
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

  static async pegaAlvaraByID(req, res) {
    const { id } = req.params;
    try {
      const alvara = await database.anexos.findOne({
        where: { id: Number(id) }, //, tipo_anexo: 'alvara'
        attributes: ["path"],
      });
      if (!alvara) {
        return res.status(404).send({
          message: "Alvará não encontrado",
        });
      }

      const acesso = path.join(baseUrl, alvara.path);
      // console.log('acesso', acesso)
      // Lendo o conteúdo do arquivo imagem
      fs.readFile(acesso, "base64", function (err, data) {
        if (err) {
          console.error(err);
          return res.status(500).send({
            message: "Erro ao ler alvará",
          });
        }
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async pegaImgPartner(req, res) {
    const { id } = req.params;
    try {
      const imagens = await database.anexos.findAll({
        where: { parceiro_id: Number(id), tipo_anexo: "image" }, //, tipo_anexo: 'image'
        attributes: ["id", "tipo_anexo", "path"],
      });
      if (!imagens || imagens.length === 0) {
        return res.status(404).send({
          message: "Imagens não encontradas",
        });
      }

      const imagensData = [];
      for (const imagem of imagens) {
        const acesso = path.join(baseUrl, imagem.path);

        const data = fs.readFileSync(acesso, "base64");
        imagensData.push({
          id: imagem.id,
          tipo_anexo: imagem.tipo_anexo,
          base64: data,
        });
      }

      return res.status(200).json(imagensData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar as imagens" });
    }
  }

  static async atualizaParceiro(req, res) {
    const { id } = req.params;
    const updateParceiro = req.body;
    try {
      await database.cadastra_parceiros.update(updateParceiro, {
        where: { id: Number(id) },
      });
      const parceiroAtualizado = await database.cadastra_parceiros.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(parceiroAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaImagem(req, res) {
    const { id } = req.params;
    const updateImage = req.body;
    // console.log('updateImage', updateImage)
    const file = req.file;
    updateImage.path = file.path.split(process.env.SPLIT)[1]; //file.path
    // console.log('path', updateImage.path)
    try {
      await database.anexos.update(updateImage, {
        where: { id: Number(id) },
      });
      const updatedImage = await database.anexos.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedImage);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaLogo(req, res) {
    const { id } = req.params;
    const updateImage = req.body;
    // console.log('updateImage', updateImage)
    const file = req.file;
    updateImage.path = file.path.split(process.env.SPLIT)[1]; //file.path
    // console.log('path', updateImage.path)
    try {
      await database.anexos.update(updateImage, {
        where: { id: Number(id) },
      });
      const updatedImage = await database.anexos.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updatedImage);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaImagem(req, res) {
    const { id } = req.params;
    const apaga = req.body;
    try {
      const imagem = await database.anexos.findOne({
        where: { id: Number(id) },
      });

      // console.log('localização', imagem.path)

      const imagemPath = path.join(baseUrl, imagem.path);
      // console.log('arquivo', imagemPath)

      fs.access(imagemPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error(`O arquivo ${imagem.filename} não existe.`);
        } else {
          console.log(`O arquivo ${imagem.filename} existe. Vou deletá-lo.`);
          // Deletar o arquivo
          fs.unlink(imagemPath, (err) => {
            if (err) {
              console.error(
                `Erro ao deletar o arquivo ${imagem.filename}: ${err}`,
              );
            } else {
              console.log(
                `O arquivo ${imagem.filename} foi deletado com sucesso.`,
              );
            }
          });
        }
      });

      await database.anexos.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        mensagem: `A imagem ${apaga.id} foi excluida com sucesso!!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletaLogo(req, res) {
    const { id } = req.params;
    const apaga = req.body;
    try {
      const logo = await database.anexos.findOne({
        where: { id: Number(id) },
      });

      // console.log('localização', logo.path)

      const logoPath = path.join(baseUrl, logo.path);
      // console.log('arquivo', logoPath)

      fs.access(logoPath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error(`O arquivo ${logo.filename} não existe.`);
        } else {
          console.log(`O arquivo ${logo.filename} existe. Vou deletá-lo.`);
          // Deletar o arquivo
          fs.unlink(logoPath, (err) => {
            if (err) {
              console.error(
                `Erro ao deletar o arquivo ${logo.filename}: ${err}`,
              );
            } else {
              console.log(
                `O arquivo ${logo.filename} foi deletado com sucesso.`,
              );
            }
          });
        }
      });

      await database.anexos.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        mensagem: `A logo ${apaga.id} foi excluida com sucesso!!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ParceiroController;
