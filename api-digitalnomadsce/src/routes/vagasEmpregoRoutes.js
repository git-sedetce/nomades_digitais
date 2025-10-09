const { Router } = require('express');
const VagasEmpregoController = require('../controllers/VagasEmpregoController');

const router = Router()
router.post('/cadastrovaga', VagasEmpregoController.jobVacancy)
router.get('/pegarvagas', VagasEmpregoController.getjobs)
router.post('/nomadvaga', VagasEmpregoController.cadastraVagaNomad)
router.get('/pegarvaga/:id', VagasEmpregoController.pegavaga)
router.get('/vagabycompany/:id', VagasEmpregoController.vagaPorEmpresa)
router.put('/atualizavaga/:id', VagasEmpregoController.updateVaga)
router.delete('/deletevaga/:id', VagasEmpregoController.apagaVaga)


module.exports = router