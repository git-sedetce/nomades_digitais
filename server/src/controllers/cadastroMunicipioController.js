const database = require('../models')

class CadastroMunicipioController {
    static async cadastraMunicipioParceiro(req, res) {
        const novoMunicpioParceiro = req.body;
        try {
          const criarMunicipioParceiro = await database.cadastra_municipios.create(
            novoMunicpioParceiro
          );
          return res.status(200).json(criarMunicipioParceiro);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

      static async pegarMunicipioParceiro(req, res) {
        try {
          const mostraMunicipioParceiro = await database.cadastra_municipios.findAll();
          return res.status(200).json(mostraMunicipioParceiro);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

      static async municipioParceiroById(req, res) {
        const { id } = req.params;
        try {
          const umMunicipioParceiro = await database.cadastra_municipios.findOne({
            where: { id: Number(id) },
          });
          return res.status(200).json(umMunicipioParceiro);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }
}

module.exports = CadastroMunicipioController;