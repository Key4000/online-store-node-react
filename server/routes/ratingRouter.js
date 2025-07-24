const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')


//получение всех рейтингов по девайсу
router.get('/device', ratingController.getAllDevice)
//получение всех рейтингов юзера 
router.get('/user', ratingController.getAllUser)
//получение одного рейтинга по id 
router.get('/:id', ratingController.getOne)
//создание рейтинга
router.post('/', ratingController.create)


module.exports = router