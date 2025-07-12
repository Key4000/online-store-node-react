//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************
const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController{
    async create(req,res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json({brand})
    }

    async getALL(req,res){
        const brands = await Brand.findAll()
        return res.json(brands) 
    }
}

module.exports = new BrandController()