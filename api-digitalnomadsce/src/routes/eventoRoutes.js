const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const EventoController = require('../controllers/EventoControllers');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pastaUploads = path.join(__dirname, '../../uploads/evento');
        verificarECriarPasta(pastaUploads);
        cb(null, pastaUploads)
    },
    filename: function(req, file, cb){
          cb(null,  Date.now() + '_digital_nomads_' + 'evento' + file.originalname)
        //cb(null, file.originalname + Date.now() + '.' + file.mimetype.split('/')[1])
        //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

// Função para verificar se a pasta existe e criar se não existir
function verificarECriarPasta(pastaPath) {
    if (!fs.existsSync(pastaPath)) {
        fs.mkdirSync(pastaPath, { recursive: true });
        console.log(`A pasta ${pastaPath} foi criada.`);
    } else {
        console.log(`A pasta ${pastaPath} já existe.`);
    }
  }

const upload = multer({ storage })

const router = Router()
router.get('/eventos', EventoController.pegaEventos)
router.get('/evento/:id', EventoController.pegaEventosById)
router.get('/imagevento/:id', EventoController.pegaImagensEventosById)
router.get('/eventocidade/:id', EventoController.pegaEventosByCity)
router.get('/eventoregiao/:id', EventoController.pegaEventosByRegion)

router.post('/cadastraevento', EventoController.cadastraEvento)
router.post('/anexoevento/:id', upload.single('file'), EventoController.anexoEvento)

router.get('/eventocommunity/:id', EventoController.pegaEventosByCommunity)
router.get('/eventcommunity/:id', EventoController.pegaEventosByCommunityWithFreq)



module.exports = router