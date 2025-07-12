const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
//Проверка роли пользователя
const checkRole = require('../middleware/checkRoleMiddleware')



//добавление типа
router.post('/', checkRole('ADMIN'), typeController.create)
//получение всех типов
router.get('/', typeController.getALL)

module.exports = router