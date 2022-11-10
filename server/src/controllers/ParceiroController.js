const database = require("../models");
const nodemailer = require("nodemailer")

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
      });
      return res.status(200).json(umParceiro);
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
    console.log('novoParceiro', novoParceiro)
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

        console.log("mailOptions", mailOptions);
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
    const caminho = file.path;
    const nome_arquivo = file.filename;
    const type = file.mimetype;    
    console.log(file);
    console.log(id);
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
        user_id: id
      });
      return res.status(200).json({message: 'Comprovante anexado com sucesso!'});
    } catch (error) {
      return res.status(500).json(error.message);
    }

    //res.send("Arquivo recebido!")
  }

  static async alvaraParceiro(req, res) {
    const file = req.file;
    const { id } = req.params;
    const caminho = file.path;
    const nome_arquivo = file.filename;
    const type = file.mimetype;    
    console.log(file);
    console.log(id);
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
        user_id: id
      });
      return res.status(200).json({message: 'Alvará anexado com Sucesso!'});
    } catch (error) {
      return res.status(500).json(error.message);
    }

    //res.send("Arquivo recebido!")
  }


  static async logoParceiro(req, res) {
    var name_arquivo =[]
        const file = req.files
        const { id } = req.params;      
        //console.log(file)        
        if(file.length>0){
          for(let img = 0; img < file.length; img++){
            const caminho = file[img].path;
            const nome_arquivo = file[img].filename;
            const type = file[img].mimetype; 
            name_arquivo.push(nome_arquivo)
            //console.log(file[img].originalname)         
              const anexarParceiro = await database.anexos.create({
                mimetype: type,
                filename: nome_arquivo,
                path: caminho,
                user_id: id
              });    
              
             //console.log(res.status(200).json(anexarParceiro));
            }
            //console.log('name_arquivo', name_arquivo)
            return res.status(200).json({message: 'Anexo enviado com Sucesso!'})
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
}

module.exports = ParceiroController;
