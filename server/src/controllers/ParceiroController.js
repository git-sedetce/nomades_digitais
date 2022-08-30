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
          text: `Prezado(a) seu cadastro foi realizado com sucesso!!!`,
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
