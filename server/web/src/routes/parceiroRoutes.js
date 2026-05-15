const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const ParceiroController = require("../controllers/ParceiroController");

const router = Router();

// Função para verificar se a pasta existe e criar se não existir
function verificarECriarPasta(pastaPath) {
  if (!fs.existsSync(pastaPath)) {
    fs.mkdirSync(pastaPath, {
      recursive: true,
    });

    console.log(`Pasta criada: ${pastaPath}`);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pastaUploads = path.join(__dirname, "../../uploads/parceiros");

    verificarECriarPasta(pastaUploads);

    cb(null, pastaUploads);
  },

  filename: function (req, file, cb) {
    const nomeArquivo =
      Date.now() + "_digital_nomads_" + file.originalname.replace(/\s/g, "_");

    cb(null, nomeArquivo);
  },
});

const upload = multer({
  storage,
});

router.get("/parceiro", ParceiroController.pegarParceiro);
router.get("/hospedagem", ParceiroController.pegarHospedagem);
router.get("/tipohospedagem/:tipo", ParceiroController.pegarTipoHospedagem);
router.get("/coworking", ParceiroController.pegarCoworking);
router.get("/gastronomia/:place", ParceiroController.pegarGstronomia);
router.get("/listaBairros", ParceiroController.listarBairros);
router.get("/listaParceiros", ParceiroController.listarParceiros);
router.get("/listaCidades", ParceiroController.listarCidades);
router.post("/parceiro",upload.fields([{name: "comprovante", maxCount: 1,}, {name: "alvara", maxCount: 1,}, {name: "logo", maxCount: 1,}, {name: "imagens", maxCount: 20,},]), ParceiroController.cadastraParceiro,);
router.get("/parceiroMail/:email", ParceiroController.parceiroByMail);
router.get("/parceiroserv/:service", ParceiroController.parceiroByService);
router.get(
  "/parceiroByBairro/:bairro",
  ParceiroController.partnerByNeighborhood,
);
router.get("/parceiroByCidade/:city", ParceiroController.partnerByCity);
router.get("/buscarcnpj/:cnpj", ParceiroController.parceiroByCnpj);
router.post("/parceiro", ParceiroController.cadastraParceiro);
// router.post("/anexos", upload.array("files"),  ParceiroController.anexosParceiro,);
router.put("/atualizaParceiro/:id", ParceiroController.atualizaParceiro);
router.put("/atualizaImagem/:id", upload.single("file"), ParceiroController.atualizaImagem,);
router.delete("/deletaimagem/:id", ParceiroController.deletaImagem);
router.post("/documento/:id", ParceiroController.pegaAlvaraByID);
router.get("/pegaImageParceiro/:id", ParceiroController.pegaImgPartner);
// router.put('/atualizaDocumento/:id', upload.single('file'), ParceiroController.atualizarAlvara)

module.exports = router;
