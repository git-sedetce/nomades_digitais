const bodyParser = require('body-parser')

const municipio = require('./municipioRoutes')
const parceiro = require('./parceiroRoutes')
//const parceiro = require()

module.exports = app => {
  app.use(bodyParser.json(),
          bodyParser.urlencoded({ extended: false }),
          municipio,
          parceiro
          )  
}