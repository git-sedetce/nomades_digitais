const database = require("../models");

class ParceiroController {
  static async pegarParceiro(req, res) {
    try {
      const mostraParceiro = await database.cadastra_parceiro.findAll();
      return res.status(200).json(mostraParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async parceiroById(req, res) {
    const { id } = req.params;
    try {
      const umParceiro = await database.cadastra_parceiro.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async cadastraParceiro(req, res) {
    const novoParceiro = req.body;
    try {
      const criarParceiro = await database.cadastra_parceiro.create(
        novoParceiro
      );
      return res.status(200).json(criarParceiro);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ParceiroController;
