const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const CadastroMunicipioController = require("../controllers/cadastroMunicipioController");

const pastaUploads = path.join(__dirname, "../../uploads/municipios");

function verificarECriarPasta(pastaPath) {
  if (!fs.existsSync(pastaPath)) {
    fs.mkdirSync(pastaPath, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    verificarECriarPasta(pastaUploads);
    cb(null, pastaUploads);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "_digital_nomads_municipios_" + file.originalname);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 15 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Somente imagens JPG, JPEG, PNG e WEBP"));
    }
  },
});


const router = Router();
router.get("/parceiroMunicipio", CadastroMunicipioController.pegarMunicipioParceiro);
router.get("/parceiroMunicipio/:id", CadastroMunicipioController.municipioParceiroById);
router.get("/cidadeDados/:cidade", CadastroMunicipioController.municipioParceiroByName);
router.post('/parceiroMunicipio', upload.array('files'), CadastroMunicipioController.cadastraMunicipioParceiro);
// router.post("/anexosMunicipio/:id", upload.array("files"),  CadastroMunicipioController.anexosMunicipioParceiro);
router.get("/imagensMunicipio/:id", CadastroMunicipioController.pegarImagensMunicipioParceiro);
router.get("/pegaImageCity6", CadastroMunicipioController.pegaImgCity06);
router.get("/cidadeTur/:turismo", CadastroMunicipioController.pegarMunicipioByTurismo);

module.exports = router;
