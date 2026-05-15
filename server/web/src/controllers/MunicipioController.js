const database = require('../models')

class MunicipioController {
    static async pegaRegiao(req, res){
        try{
            const todasAsRegiaos = await database.Regiao.findAll({
                attributes: ['id', 'nome'],
            })
            return res.status(200).json(todasAsRegiaos)
        }
        catch (error){
            return res.status(500).json(error.message)
        }     
    }
    static async pegaMunicipio(req, res){
        try{
            const todosMunicipios = await database.Cidades.findAll({
                attributes: ['id', 'nome_municipio', 'regiao_id', 'cod_ibge'],
            })
            return res.status(200).json(todosMunicipios)
        }
        catch (error){
            return res.status(500).json(error.message)
        }     
    }

    static async dadosMunicipio(req, res){
        try{
            const todosMunicipios = await database.Cidades.findAll({
                 include: [
                          {
                            association: "ass_municipio_regiao",
                            where: (database.Cidades.regiao_id = database.Regiao.id),
                            attributes: ["nome"],
                          }
                        ],
            })
            return res.status(200).json(todosMunicipios)
        }
        catch (error){
            return res.status(500).json(error.message)
        }     
    }

    static async pegaUmaRegiao(req, res){
        const { id } = req.params
        try{
            const umaRegiao = await database.Regiao.findOne( {
                where: {
                    id: Number(id)
                }
            })            
            return res.status(200).json(umaRegiao)
        }catch (error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmMunicipio(req, res){
        const { cidade } = req.params
        try{
            const umMunicipio = await database.Cidades.findOne( {
                where: {
                    nome_municipio: String(cidade)
                }
            })            
            return res.status(200).json(umMunicipio)
        }catch (error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = MunicipioController