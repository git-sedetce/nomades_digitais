const bodyParser = require('body-parser')
const municipio = require('./municipioRoutes')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(municipio)  
}