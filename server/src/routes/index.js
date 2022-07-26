const bodyParser = require('body-parser')

const municipio = require('./municipioRoutes')
const parceiro = require()

module.exports = app => {
  app.use(bodyParser.json())
  app.use(municipio)  
}