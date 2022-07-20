const { Router } = require('express')
const MunicipioController = require('../controllers/MunicipioController')

const router = Router()
router.get('/municipio', MunicipioController.pegaRegiao)

module.exports = router