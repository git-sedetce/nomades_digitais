const database = require("../models");
const nodemailer = require("nodemailer")

class ParceiroController {
  static async pegarParceiro(req, res) {
    try {
      const mostraParceiro = await database.cadastra_parceiro.findAll();
      return res.status(200).json(mostraParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async parceiroById(req, res) {
    const { id } = req.params;
    try {
      const umParceiro = await database.cadastra_parceiro.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async cadastraParceiro(req, res) {
    const novoParceiro = req.body;
    console.log('novoParceiro', novoParceiro)
    try {
      const criarParceiro = await database.cadastra_parceiro.create(
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
        var mailOptions = {
          from: "digital.nomads@sedet.ce.gov.br",
          to: novoParceiro.email_parceiro,
          subject: "Cadastro Parceiro",
          html:`<h2>Parabéns!</h2><p>Parabéns! O cadastro da sua empresa foi realizado com sucesso. Os dados enviados pela sua empresa serão analisados e em breve você receberá o retorno da sua inscrição e poderá fazer parte do Projeto Digital Nomads CE, atraindo um novo público para o seu estabelecimento.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>CNPJ: ${novoParceiro.cnpj}</li><li>Nome fantasia: ${novoParceiro.nome_fantasia}</li><li>Razão Social: ${novoParceiro.razao_social}</li><li>Contato: ${novoParceiro.telefone}</li><li>CEP: ${novoParceiro.cep}</li><li>Logradouro: ${novoParceiro.logradouro}</li><li>Número: ${novoParceiro.numero}</li><li>Complemento: ${novoParceiro.complemento}</li><li>Bairro: ${novoParceiro.bairro}</li><li>Cidade: ${novoParceiro.cidade}</li><li>Estado: ${novoParceiro.estado}</li><li>Email: ${novoParceiro.email_parceiro}</li><li>Mídia Social: ${novoParceiro.midia_social}</li><li>Tipo de Serviço: ${novoParceiro.tipo_service}</li><li>Serviços essenciais: ${novoParceiro.essential_service}</li><li>Serviço de internet: ${novoParceiro.internet_service}</li><li>Outro serviço: ${novoParceiro.outro_servico}</li><li>Reuniões: ${novoParceiro.trabalho_reunioes}</li><li>Orientação: ${novoParceiro.orienta_equipe}</li><li>Localização: ${novoParceiro.localizacao}</li><li>Ramo: ${novoParceiro.ramo}</li><li>Benefícios: ${novoParceiro.beneficios}</li><li>Espaços Culturais: ${novoParceiro.espacos_culturais}</li></ul><p>Caso a sua inscrição seja deferida, os dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong> ou <strong>Parceiros</strong>.</p><p>Agradecemos a participação da sua empresa nesse mais novo projeto e contamos com a sua colaboração para tornar o Ceará um polo para os Nômades Digitais.</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>digital.nomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`
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

  static async anexoParceiro(req, res) {
    const file = req.file
    if(file){
      res.json(file)
    }else{
      throw new Error("File upload unseccessful")
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
