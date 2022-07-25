const  express = require('express')
const routes = require('./routes')

const app = express()
const port = 2225

routes(app)

app.listen(port, () => console.log(`O Servidor está rodando na porta ${port}`))

module.exports = app
