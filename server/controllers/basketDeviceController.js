//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************

const { Device, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')

class basketDeviceController {

//получение девайса из корзины
  async getOne(req,res){
  //из параметров строки запроса получаем id девайса
    const { id } = req.params
  //ищем девайс единственный, который соотвествует 
    const device = await Device.findOne({
       where: { id }
 })
 //возвращаем их на клиент 
    return res.json(device)
 }

//добавление девайса в корзину
async create(req,res,next){
  try{
    let { basketId, deviceId } = req.body
    const basketdevice = await BasketDevice.create({
      basketId, deviceId
    })
    return res.json(basketdevice)
  }catch(e){          
    next(ApiError.badRequest(e.message)) 
  }
 }

}

module.exports = new basketDeviceController()
