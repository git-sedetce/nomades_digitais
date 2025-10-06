const { Router } = require('express');
const VagasEmpregoController = require('../controllers/VagasEmpregoController');

const router = Router()
router.post('/cadastrovaga', VagasEmpregoController.jobVacancy)
router.get('/pegarvagas', VagasEmpregoController.getjobs)
router.post('/nomadvaga', VagasEmpregoController.cadastraVagaNomad)
router.get('/pegarvaga/:id', VagasEmpregoController.pegavaga)


module.exports = router