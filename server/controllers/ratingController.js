//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************

const { Rating, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class ratingController {

  //получение всех рейтингов по девайсу
  async getAllDevice(req, res) {
    const { deviceId } = req.query
    const rating = await Rating.findAll({
      where: { deviceId }
    })
    return res.json(rating)
  }
  //получение всех рейтингов юзера 
  async getAllUser(req, res) {
    const { userId } = req.query
    const rating = await Rating.findAll({
      where: { userId }
    })
    return res.json(rating)
  }
  //получение одного рейтинга по id 
  async getOne(req, res) {
    const { id } = req.params
    const rating = await Rating.findOne({
      where: { id }
    })
    return res.json(rating)
  }
  //создание рейтинга
  async create(req, res, next) {
    try {
      let { userId, deviceId, rate } = req.body
      rate = Number(rate)
      if (rate < 0 || rate > 5) {
        next(ApiError.badRequest('Не корректное число для рейтинга'))
      }

      const rating = await Rating.create({
        userId, deviceId, rate
      })
      return res.json(rating)

    } catch(e) {

    next(ApiError.badRequest(e.message))

  }
}


}

module.exports = new ratingController()