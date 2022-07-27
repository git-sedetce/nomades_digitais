const { Router } = require('express')
const ParceiroController = require('../controllers/ParceiroController')

const router = Router()
router.get('/parceiro', ParceiroController.pegarParceiro)
router.get('/parceiro/:id', ParceiroController.parceiroById)
router.post('/parceiro', ParceiroController.cadastraParceiro)


module.exports = router