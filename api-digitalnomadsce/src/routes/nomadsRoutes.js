const { Router } = require('express')
const NomadsController = require('../controllers/NomadsController')

const router = Router()
router.post('/nomads', NomadsController.cadastraNomads)
router.post('/comapny', NomadsController.cadastraCompany)
router.get('/nomadsAll', NomadsController.pegaTodosNomads)
router.get('/nomads/:id', NomadsController.pegaUmNomad)
router.get('/nomad/:email', NomadsController.nomadByEmail)
router.get('/nomadUser/:email', NomadsController.nomadEmail)
router.get('/verificacnpj/:cnpj', NomadsController.nomadBycnpj)
router.put('/nomads/:id', NomadsController.atualizaNomad)
router.put('/companynomads/:id', NomadsController.updateCompanyNomad)
router.delete('/nomads/:id', NomadsController.apagaNomad)
router.post('/nomads/:id/restaura', NomadsController.restauraNomad)

module.exports = router