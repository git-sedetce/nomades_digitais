const { Router } = require('express')
const NomadsController = require('../controllers/NomadsController')

const router = Router()
router.post('/nomads', NomadsController.cadastraNomads)

module.exports = router