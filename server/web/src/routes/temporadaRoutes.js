const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const TemporadaController = require('../controllers/TemporadaControllers');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pastaUploads = path.join(__dirname, '../../uploads/temporada');
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
router.post('/cadastratemporada', TemporadaController.cadastraTemporada)
router.get('/alltemporada', TemporadaController.pegaTemporadas)
router.get('/temporada/:id', TemporadaController.pegaTemporadaById)
router.get('/imagetemporada/:id', TemporadaController.pegaImagensTemporadaById)
router.get('/temporadabyCity/:cidade', TemporadaController.pegaTemporadasbyCity)

router.post('/imagemTemporada/:id', upload.single('file'), TemporadaController.anexoImagem)



module.exports = router