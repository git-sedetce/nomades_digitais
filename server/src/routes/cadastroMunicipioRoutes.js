const { Router } = require('express')
const CadastroMunicipioController = require('../controllers/cadastroMunicipioController')

const router = Router()
router.get('/parceiroMunicipio', CadastroMunicipioController.pegarMunicipioParceiro)
router.get('/parceiroMunicipio/:id', CadastroMunicipioController.municipioParceiroById)
router.post('/parceiroMunicipio', CadastroMunicipioController.cadastraMunicipioParceiro)
router.post('/anexos', upload.array('files'), CadastroMunicipioController.anexosMunicipioParceiro)


module.exports = router