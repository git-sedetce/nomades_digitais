const { Router } = require('express')
const multer = require('multer')
const CadastroMunicipioController = require('../controllers/cadastroMunicipioController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/municipios/')
    },
    filename: function(req, file, cb){
          cb(null,  Date.now() + '_digital_nomads_' + 'municipios' + file.originalname)
        //cb(null, file.originalname + Date.now() + '.' + file.mimetype.split('/')[1])
        //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })

const router = Router()
router.get('/parceiroMunicipio', CadastroMunicipioController.pegarMunicipioParceiro)
router.get('/parceiroMunicipio/:id', CadastroMunicipioController.municipioParceiroById)
router.post('/parceiroMunicipio', CadastroMunicipioController.cadastraMunicipioParceiro)
router.post('/anexosMunicipio', upload.array('files'), CadastroMunicipioController.anexosMunicipioParceiro)


module.exports = router