const database = require("../models");
const nodemailer = require("nodemailer")
const { Sequelize, QueryTypes } = require('sequelize');
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd() //+ "/src"; __dirname + '.

class ParceiroController {
  static async pegarParceiro(req, res) {
    try {
      const mostraParceiro = await database.cadastra_parceiros.findAll();
      return res.status(200).json(mostraParceiro);
    } catch (error) {
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
            where: (database.cadastra_parceiros.id = database.anexos.user_id),
            attributes: ["mimetype", "path"]
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
          [Sequelize.fn("MAX", Sequelize.col("cadastra_parceiros.id")), "cadastra_parceiros.id"],
          "bairro",
        ],
        group: ["bairro"],
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
          [Sequelize.fn("MAX", Sequelize.col("cadastra_parceiros.id")), "cadastra_parceiros.id"],
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
    const { cnpj } = req.body;
    try {
      const parceiro_cnpj = await database.cadastra_parceiros.findOne({
        where: { cnpj: cnpj },
      });
      return res.status(200).json(parceiro_cnpj);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cadastraParceiro(req, res) {    
    var email_grupo = "admdigitalnomads@sedet.ce.gov.br"
    const novoParceiro = req.body;
    // console.log('novoParceiro', novoParceiro)
    try {
      const criarParceiro = await database.cadastra_parceiros.create(
        novoParceiro
      )
      
        var transporter = nodemailer.createTransport({
          host: "172.26.2.26",//"relay.etice.ce.gov.br",
          port: 25,
          secure : false,
          /*auth: {
            user: "digital.nomads@sedet.ce.gov.br",
            pass: "@Sedet2022",
          },*/
          tls: {            
            rejectUnauthorized: false
        },
        });
        var email = novoParceiro.email_parceiro
        var enviarEmail = [email, email_grupo]
        var mailOptions = {
          from: "digital.nomads@sedet.ce.gov.br",
          to: enviarEmail ,
          subject: "Cadastro Parceiro",
          html:`<h2>Parabéns!</h2><p>Parabéns! O cadastro da sua empresa foi realizado com sucesso. Os dados enviados pela sua empresa serão analisados e em breve você receberá o retorno da sua inscrição e poderá fazer parte do Projeto Digital Nomads CE, atraindo um novo público para o seu estabelecimento.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>CNPJ: ${novoParceiro.cnpj}</li><li>Nome fantasia: ${novoParceiro.nome_fantasia}</li><li>Razão Social: ${novoParceiro.razao_social}</li><li>Contato: ${novoParceiro.telefone}</li><li>CEP: ${novoParceiro.cep}</li><li>Logradouro: ${novoParceiro.logradouro}</li><li>Número: ${novoParceiro.numero}</li><li>Complemento: ${novoParceiro.complemento}</li><li>Bairro: ${novoParceiro.bairro}</li><li>Cidade: ${novoParceiro.cidade}</li><li>Estado: ${novoParceiro.estado}</li><li>Email: ${novoParceiro.email_parceiro}</li><li>Mídia Social: ${novoParceiro.midia_social}</li><li>Tipo de Serviço: ${novoParceiro.tipo_service}</li><li>Serviços essenciais: ${novoParceiro.essential_service}</li><li>Serviço de internet: ${novoParceiro.internet_service}</li><li>Outro serviço: ${novoParceiro.outro_servico}</li><li>Reuniões: ${novoParceiro.trabalho_reunioes}</li><li>Orientação: ${novoParceiro.orienta_equipe}</li><li>Localização: ${novoParceiro.localizacao}</li><li>Ramo: ${novoParceiro.ramo}</li><li>Benefícios: ${novoParceiro.beneficios}</li><li>Espaços Culturais: ${novoParceiro.espacos_culturais}</li><li>Idioma: ${novoParceiro.idioma}</li><li>Qual Idioma: ${novoParceiro.qual_idioma}</li></ul><p>Caso a sua inscrição seja deferida, os dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong> ou <strong>Parceiros</strong>.</p><p>Agradecemos a participação da sua empresa nesse mais novo projeto e contamos com a sua colaboração para tornar o Ceará um polo para os Nômades Digitais.</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>admdigitalnomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`
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
              messagem: "email enviado com sucesso!",
              info: info.response,
            };
          }
        });
      
      return res.status(200).json(criarParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  /*static async anexoParceiro(req, res) {
    const file = req.file
    console.log(file)
    if(file){
      res.json(file)
    }else{
      throw new Error("File upload unseccessful")
    }
      //res.send("Arquivo recebido!")
  }*/
  
  static async anexoParceiro(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path.split("server")[1];
    const nome_arquivo = file.filename;
    const type = file.mimetype;    
    // console.log(file);
    // console.log(id);
    try {
      /*if (file) {
        res.json(file);
      } else {
        throw new Error("File upload unseccessful");
      }*/
      const anexarParceiro = await database.anexos.create({
        mimetype: type,
        filename: nome_arquivo,
        path: caminho,
        user_id: id,
        tipo_anexo: 'comprovante',
        raw: true
      });
      // console.log('anexarParceiro', anexarParceiro)
      return res.status(200).json({message: 'Comprovante anexado com sucesso!'});
    } catch (error) {
      return res.status(500).json(error.message);
    }

    //res.send("Arquivo recebido!")
  }

  static async alvaraParceiro(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path.split("server")[1];
    const nome_arquivo = file.filename;
    const type = file.mimetype;    
    // console.log(file);
    // console.log(id);
    try {
      /*if (file) {
        res.json(file);
      } else {
        throw new Error("File upload unseccessful");
      }*/
      const anexarParceiro = await database.anexos.create({
        mimetype: type,
        filename: nome_arquivo,
        path: caminho,
        user_id: id,
        tipo_anexo: 'alvara',
        raw: true
      });
      // console.log('anexarParceiro', anexarParceiro)
      return res.status(200).json({message: 'Alvará anexado com Sucesso!'});
    } catch (error) {
      return res.status(500).json(error.message);
    }

    //res.send("Arquivo recebido!")
  }


  static async logoParceiro(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path.split("server")[1];
    const nome_arquivo = file.filename;
    const type = file.mimetype;    
    // console.log(file);
    // console.log(id);
    try {
      /*if (file) {
        res.json(file);
      } else {
        throw new Error("File upload unseccessful");
      }*/
      const anexarParceiro = await database.anexos.create({
        mimetype: type,
        filename: nome_arquivo,
        path: caminho,
        user_id: id,
        tipo_anexo: 'logo'
      });
      // console.log('anexarParceiro', anexarParceiro)
      return res.status(200).json({message: 'Logo enviado com Sucesso!'});
    } catch (error) {
      return res.status(500).json(error.message);
    }

    //res.send("Arquivo recebido!")
  }

  static async imgsParceiro(req, res) {
    var name_arquivo =[]
        const file = req.files
        const { id } = req.params;      
        // console.log(file)        
        if(file.length>0){
          for(let img = 0; img < file.length; img++){
            const caminho = file[img].path.split("server")[1];
            const nome_arquivo = file[img].filename;
            const type = file[img].mimetype; 
            name_arquivo.push(nome_arquivo)
            //console.log(file[img].originalname)         
              const anexarParceiro = await database.anexos.create({
                mimetype: type,
                filename: nome_arquivo,
                path: caminho,
                user_id: id,
                tipo_anexo: 'image'
              });    
              
            //  console.log(res.status(200).json(anexarParceiro));
            }
            //console.log('name_arquivo', name_arquivo)
            return res.status(200).json({message: 'Imagens enviadas com Sucesso!'})
        }else{
          return res.status(500).json(error.message);
        }

    //res.send("Arquivo recebido!")
  }  

  static async anexosParceiro(req, res) {
    const file = req.files
    if(file){
      res.json(file)
    }else{
      throw new Error("File upload unseccessful")
    }
      //res.send("Arquivo recebido!")
  }  

  static async pegaLogoByID(req, res) {
     const { id } = req.params;
         try {
             const logoParceiro = await database.anexos.findOne({
                 where: { user_id: Number(id), tipo_anexo: 'logo' },
                 attributes: ["path"],
             });
                if (!logoParceiro) {
                 return res.status(404).send({
                     message: "Imagem não encontrada",
                 });
             }  
                       
             const acesso = path.join(baseUrl, logoParceiro.path)   
            //  console.log('acesso', acesso)         
                // Lendo o conteúdo do arquivo imagem
             fs.readFile(acesso, 'base64', function (err, data) {
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

  static async pegaImgPartner(req, res){
    const { id } = req.params;
    try{
      const imagens = await database.anexos.findAll({
        where: { user_id: Number(id), tipo_anexo: 'image' },
        attributes: ['id', 'tipo_anexo', 'path']
      });
      if(!imagens || imagens.length === 0){
        return res.status(404).send({
          message: "Imagens não encontradas"
        })
      }

      const imagensData = [];
      for(const imagem of imagens){
        const acesso = path.join(baseUrl, imagem.path)

        const data = fs.readFileSync(acesso, 'base64');
        imagensData.push({
          id: imagem.id,
          tipo_anexo: imagem.tipo_anexo,
          base64: data
        })
      }

      return res.status(200).json(imagensData)

    } catch (error){
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar as imagens'})
    }

  }
}

module.exports = ParceiroController;
