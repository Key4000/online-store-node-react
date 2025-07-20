// ***********************************************

//  Основной роутер , связующее звено , 
//  для подроутеров

// ***********************************************
const Router = require('express')
const router = new Router()

//подключаем подроутеры
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const basketRouter = require('./basketRouter')
const basketDeviceRouter = require('./basketDeviceRouter')
const ratingRouter = require('./ratingRouter')

//указываем подроутеры , и маршруты по которым они будут отрабатывать
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/basketdevice', basketDeviceRouter)
router.use('/rating', ratingRouter)


module.exports = router