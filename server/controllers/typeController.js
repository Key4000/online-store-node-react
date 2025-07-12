//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************
const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')


class TypeController{
    async create(req,res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({type})
    }

    async getALL(req,res){
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()