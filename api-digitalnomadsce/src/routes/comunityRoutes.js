const { Router } = require('express');
const ComunityController = require('../controllers/ComunityControllers');

const router = Router()
router.post('/newcomunity', ComunityController.cadastraComunidade)
router.post('/newmidiacomunity', ComunityController.cadastraMidiaComunidade)
router.post('/meetcomunity', ComunityController.cadastraEncontrosComunidade)
router.get('/getcomunity', ComunityController.pegaComunidade)
router.get('/getmidia', ComunityController.pegaMidia)
router.get('/getencontro', ComunityController.pegaEncontros)
router.get('/comunity/:id', ComunityController.pegaComunidadeById)
router.get('/midiacomunity/:id', ComunityController.pegaMidiaById)
router.get('/meetcomunidade/:id', ComunityController.pegaEncontrosByCity)



module.exports = router