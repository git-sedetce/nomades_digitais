const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ExperienceController = require('../controllers/ExperienceControllers');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pastaUploads = path.join(__dirname, '../../uploads/experience');
        verificarECriarPasta(pastaUploads);
        cb(null, pastaUploads)
    },
    filename: function(req, file, cb){
          cb(null,  Date.now() + '_digital_nomads_' + 'experience' + file.originalname)
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
router.post('/registerexperience', upload.single('image'),ExperienceController.cadastraExperience)
router.post('/cadastrarexperience', ExperienceController.participacaoExperience)
router.get('/experiences', ExperienceController.pegaExperiences)
router.get('/participantes', ExperienceController.pegarParticipantes)
router.get('/experience/:id', ExperienceController.pegaExperiencesById)
router.get('/participantes/:id', ExperienceController.pegarParticipantesById)
router.get('/imageexperience/:id', ExperienceController.pegaImagensExperiencesById)
router.get('/experiencecity/:id', ExperienceController.pegaExperiencesByCity)
// router.get('/experienceregion/:id', ExperienceController.pegaExperiencesByRegion)
router.post('/attachexperience/:id', upload.single('file'), ExperienceController.anexoExperience)
router.get('/tipoexperiences', ExperienceController.pegaTypeExperiences)



module.exports = router