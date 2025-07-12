const {Router} = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

//добавление бренда
router.post('/', brandController.create)
//получение всех брендов
router.get('/', brandController.getALL)

module.exports = router