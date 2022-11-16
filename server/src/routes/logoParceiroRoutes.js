const { Router } = require('express')
const multer = require('multer')
const ParceiroController = require('../controllers/ParceiroController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/parceiros/logo/')
    },
    filename: function(req, file, cb){
          cb(null,  Date.now() + '_digital_nomads_' + 'logo_' + 'parceiros_' + file.originalname)
    }
})

const upload = multer({ storage })

const router = Router()
router.post('/anexo_logo/:id', upload.single('file'), ParceiroController.logoParceiro)

module.exports = router