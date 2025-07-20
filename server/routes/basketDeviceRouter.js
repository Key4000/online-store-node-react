const Router = require('express')
const router = new Router()
const basketDeviceController = require('../controllers/basketDeviceController')


//получение девайса корзины
router.get('/:id', basketDeviceController.getOne)
//добавление девайса в корзину
router.post('/', basketDeviceController.create)



module.exports = router