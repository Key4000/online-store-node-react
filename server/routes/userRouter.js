const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)
const userController =  require('../controllers/userController')
//подключаем мидлвейр с проверкой токена на валидность
const authMiddleware = require('../middleware/authMiddleware')




//маршрут регистрации
router.post('/registration', userController.registration)
//маршрут авторизация
router.post('/login', userController.login)
//проверка авторизации пользователя
router.get('/auth', authMiddleware, userController.check)
//удаление пользователя
router.delete('/:id', userController.deleteUser)


module.exports = router