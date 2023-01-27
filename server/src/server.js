const  express = require('express')
const cors = require('cors');
const routes = require('./routes')

const app = express()
const port = 2225

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: ['https://digitalnomads.ce.gov.br', 'http://localhost:4290', 'https://localhost:4290'],
  optionsSuccessStatus:200,
  methods: "GET, PUT, POST, DELETE",
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Access-Control-Allow-Origin"],
};
app.use(cors(corsOptions))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


routes(app)

app.listen(port, () => console.log(`O Servidor está rodando`))

module.exports = app
