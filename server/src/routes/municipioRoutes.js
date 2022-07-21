const { Router } = require('express')
const MunicipioController = require('../controllers/MunicipioController')

const router = Router()
router.get('/municipio', MunicipioController.pegaRegiao)
router.get('/municipio/:id', MunicipioController.pegaUmaRegiao)

module.exports = router