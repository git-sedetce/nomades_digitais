const { Router } = require('express')
const CadastroMunicipioController = require('../controllers/cadastroMunicipioController')

const router = Router()
router.get('/parceiroMunicipio', CadastroMunicipioController.pegarMunicipioParceiro)
router.get('/parceiroMunicipio/:id', CadastroMunicipioController.municipioParceiroById)
router.post('/parceiroMunicipio', CadastroMunicipioController.cadastraMunicipioParceiro)


module.exports = router