const { Router } = require('express')
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const ParceiroController = require('../controllers/ParceiroController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pastaUploads = path.join(__dirname, '../../uploads/parceiros/logo');
        verificarECriarPasta(pastaUploads);
        cb(null, pastaUploads)
    },
    filename: function(req, file, cb){
          cb(null,  Date.now() + '_digital_nomads_' + 'logo_' + 'parceiros_' + file.originalname)
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
router.post('/anexo_logo/:id', upload.single('file'), ParceiroController.logoParceiro)
// router.get('/logo_parceiro', ParceiroController.pegaLogo)
router.get('/logo_parceiro/:id', ParceiroController.pegaLogoByID)

module.exports = router