const bodyParser = require('body-parser')

const municipio = require('./municipioRoutes')
const parceiro = require('./parceiroRoutes')
const municipioParceiro = require('./cadastroMunicipioRoutes')

module.exports = app => {
  app.use(bodyParser.json(),
          bodyParser.urlencoded({ extended: false }),
          municipio,
          parceiro,
          municipioParceiro
          )  
}