const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

//добавление девайса
router.post('/', deviceController.create)
//получение всех девайсов
router.get('/', deviceController.getAll)
//получение отдельно взятого девайса по id
router.get('/:id', deviceController.getOne)
//удаление отдельно взятого девайса по id 
router.delete('/:id', deviceController.deleteOne)


module.exports = router