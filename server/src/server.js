const  express = require('express')
const bodyParser = require("body-parser")
const routes = require('./routes')
const cors = require("cors");


var whitelist = [
  'http://localhost:4290',
  'http://digitalnomads.ce.gov.br',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Acesso negado à API " + origin));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST, DELETE",
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
};
/*var corsOptions = {
  origin: 'http://localhost:4290',
  optionsSuccessStatus:200,
};*/

const app = express()
const port = 2225
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

routes(app)

var whitelist = [
    "http://localhost:4290",
    "http://localhost",
  ]; //process.env.WHITE_LIST;

var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Acesso negado à API " + origin));
      }
    },
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  };
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(cors());

app.listen(port, () => console.log(`O Servidor está rodando`))

module.exports = app
