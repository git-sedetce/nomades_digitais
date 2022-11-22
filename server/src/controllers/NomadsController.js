const database = require("../models");
const nodemailer = require("nodemailer")

class NomadsController{

    static async cadastraNomads(req, res) {    
        var email_grupo = "admdigitalnomads@sedet.ce.gov.br"
        const novoNomads = req.body;
        console.log('novoNomads', novoNomads)
        try {
          const criarNomads = await database.cadastra_nomads.create(
            novoNomads
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
            var email = novoNomads.nomad_email
            var enviarEmail = [email, email_grupo]
            var mailOptions = {
              from: "digital.nomads@sedet.ce.gov.br",
              to: enviarEmail ,
              subject: "Cadastro Nomads",
              html:`<h2>Parabéns!</h2><p>Parabéns! O cadastro do Nomad Digital foi realizado com sucesso.</p><p>Abaixo você pode ver os dados informados durante o cadastro:</p><ul><li>CNPJ: ${novoNomads.cnpj}</li><li>Nome: ${novoNomads.nome}</li><li>Sobrenome: ${novoNomads.lastName}</li><li>Contato: ${novoNomads.contato_nomad}</li><li>Email: ${novoNomads.nomad_email}</li><li>Cidade: ${novoNomads.cidade}</li><li>Região: ${novoNomads.regiao}</li><li>País: ${novoNomads.country}</li><li>Data de partida: ${novoNomads.departure_date}</li><li>Dividir informações: ${novoNomads.shared_info}</li><li>Envio de notícias: ${novoNomads.nomads_news}</li><li>Sugestões: ${novoNomads.suggestion}</li></ul><p>Caso a sua inscrição seja deferida, os dados acima informados poderão ser conferidos no site do projeto, na aba <strong>Escolha sua nova parada</strong>.</p><p>Agradecemos a participação, espero que curta o nosso Ceará, aproveite!!!!</p><p>Para maiores duvidas ou esclarecimentos entre em contato conosco pelo e-mail: <a>admdigitalnomads@sedet.ce.gov.br</a> ou pelo telefone (85) 3108.1039.</p><p>Atenciosamente,</p><p>Equipe Digital Nomads CE.</p>`
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
          
          return res.status(200).json(criarNomads);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

}

module.exports = NomadsController