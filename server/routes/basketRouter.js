const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')


//получение корзины
router.get('/', basketController.getOne)


module.exports = router