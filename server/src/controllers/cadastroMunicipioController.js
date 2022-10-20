const database = require('../models')
const nodemailer = require("nodemailer")


class CadastroMunicipioController {
    static async cadastraMunicipioParceiro(req, res) {
      var email_grupo = "admdigitalnomads@sedet.ce.gov.br"      
        const novoMunicipioParceiro = req.body;
        try {
          const criarMunicipioParceiro = await database.cadastra_municipios.create(
            novoMunicipioParceiro
          )
          console.log(novoMunicipioParceiro)
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
          var email = novoMunicipioParceiro.email_prefeitura
          var enviarEmail = [email, email_grupo]
          var mailOptions = {
            from: "digital.nomads@sedet.ce.gov.br",
            to: enviarEmail, //novoMunicipioParceiro.email_prefeitura
            subject: "Cadastro Municipio",
            html:`<h2>Parabéns!</h2><p>O cadastro do seu município foi realizado com sucesso. Agora você faz parte do Projeto Digital Nomads CE e o seu município está apto a receber os Nômades Digitais.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>Cidade: ${novoMunicipioParceiro.cidade}</li><li>Região: ${novoMunicipioParceiro.regiao}</li><li>Email: ${novoMunicipioParceiro.email_prefeitura}</li><li>Contato: ${novoMunicipioParceiro.contato_prefeitura}</li><li>Link: ${novoMunicipioParceiro.link_prefeitura}</li><li>História: ${novoMunicipioParceiro.historia_cidade}</li><li>Serviço de Wifi: ${novoMunicipioParceiro.wifi_service}</li><li>Wifi da cidade: ${novoMunicipioParceiro.wifi_cidade}</li><li>Serviço para estrangeiro: ${novoMunicipioParceiro.service_estrangeiro}</li><li>Serviço da cidade: ${novoMunicipioParceiro.service_cidade}</li><li>Serviço para empresário: ${novoMunicipioParceiro.service_empresario}</li><li>Serviço de segurança: ${novoMunicipioParceiro.service_seguranca}</li><li>Pontos turísticos: ${novoMunicipioParceiro.pontos_turisticos}</li><li>Espaços Culturais: ${novoMunicipioParceiro.espacos_culturais}</li><li>Espaços de lazer: ${novoMunicipioParceiro.espacos_lazer}</li><li>Tipo de turismo: ${novoMunicipioParceiro.tipo_turismo}</li><li>Turismo Ecolológico: ${novoMunicipioParceiro.tourism_ecologico}</li><li>Turismo Praiano: ${novoMunicipioParceiro.tourism_praiano}</li><li>Turismo Radical: ${novoMunicipioParceiro.tourism_radical}</li><li>Turismo Religioso: ${novoMunicipioParceiro.tourism_religioso}</li><li>Turismo Serrano: ${novoMunicipioParceiro.tourism_serrano}</li><li>Turismo Sertanejo: ${novoMunicipioParceiro.tourism_sertanejo}</li><li>Rota: ${novoMunicipioParceiro.rota}</li><li>Qual rota: ${novoMunicipioParceiro.qual_rota}</li></ul><p>Em breve esses dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong>.</p><p>Agradecemos a participação do seu município nesse mais novo projeto e contamos com a sua colaboração para tornar o Ceará um polo para os Nômades Digitais</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>admdigitalnomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`
            
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
          return res.status(200).json(criarMunicipioParceiro);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

      static async pegarMunicipioParceiro(req, res) {
        try {
          const mostraMunicipioParceiro = await database.cadastra_municipios.findAll();
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

      static async anexosMunicipioParceiro(req, res) {
        const file = req.files
        const { id } = req.params;      
        //console.log(file)        
        if(file.length>0){
          for(let img = 0; img < file.length; img++){
            const caminho = file[img].path;
            const nome_arquivo = file[img].filename;
            const type = file[img].mimetype; 
            //console.log(file[img].originalname)         
              const anexarMunicipio = await database.anexo_municipio.create({
                mimetype: type,
                filename: nome_arquivo,
                path: caminho,
                municipio_id: id
              });    
             //console.log(res.status(200).json(anexarMunicipio));
            }
            return res.status(200).json({message: 'Anexo enviado com Sucesso!'})
        }else{
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
}

module.exports = CadastroMunicipioController;