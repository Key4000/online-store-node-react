//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************

const { BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')

class basketController {

//получение корзины
  async getOne(req,res){
  //из строки запроса получаем id корзины текущей 
    const { basketId } = req.query
  //ищем все девайсы, которые лежат в корзине с basketId
    const basketDevice = await BasketDevice.findAll({
       where: { basketId }
 })
 //возвращаем их на клиент 
    return res.json(basketDevice)
 }
}

module.exports = new basketController()