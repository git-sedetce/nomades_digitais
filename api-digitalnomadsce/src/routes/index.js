const bodyParser = require('body-parser')
const express = require('express')
const municipio = require('./municipioRoutes')
const parceiro = require('./parceiroRoutes')
const nomads = require('./nomadsRoutes')
const parceiroLogo = require('./logoParceiroRoutes')
const municipioParceiro = require('./cadastroMunicipioRoutes')
const user = require('./userRoutes')
const evento = require('./eventoRoutes')
const temporada = require('./temporadaRoutes')
const comunity = require('./comunityRoutes')
const vaga = require('./vagasEmpregoRoutes')

module.exports = app => {
  app.use(express.json(),
          express.urlencoded({ extended: false }),
          municipio,
          parceiro,
          nomads,
          parceiroLogo,          
          municipioParceiro,
          user,
          evento,
          temporada,
          comunity,
          vaga
          )  
}