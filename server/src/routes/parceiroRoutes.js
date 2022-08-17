const { Router } = require('express')
const multer = require('multer')
const ParceiroController = require('../controllers/ParceiroController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/parceiros/')
    },
    filename: function(req, file, cb){
          cb(null,  Date.now() + '_digital_nomads_' + 'parceiros_' + file.originalname)
        //cb(null, file.originalname + Date.now() + '.' + file.mimetype.split('/')[1])
        //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })

const router = Router()
router.get('/parceiro', ParceiroController.pegarParceiro)
router.get('/parceiro/:id', ParceiroController.parceiroById)
router.post('/parceiro', ParceiroController.cadastraParceiro)
router.post('/anexo', upload.single('file'), ParceiroController.anexoParceiro)
router.post('/anexos', upload.array('files'), ParceiroController.anexosParceiro)


module.exports = router