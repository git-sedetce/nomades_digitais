const { Router } = require('express')
const MunicipioController = require('../controllers/MunicipioController')

const router = Router()
router.get('/regiao', MunicipioController.pegaRegiao)
router.get('/regiao/:id', MunicipioController.pegaUmaRegiao)
router.get('/todos_municipio', MunicipioController.pegaMunicipio)
router.get('/municipio/:cidade', MunicipioController.pegaUmMunicipio)

module.exports = router