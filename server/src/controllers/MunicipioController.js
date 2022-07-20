const database = require('../models')

class MunicipioController {
    static async pegaRegiao(req, res){
        try{
            const todasAsRegiaos = await database.Regiao.findAll()
            return res.status(200).json(todasAsRegiaos)
        }catch (error){
            return res.status(500).json(error.message)
        }
        

    }
}

module.esports = MunicipioController