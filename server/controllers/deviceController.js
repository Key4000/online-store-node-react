//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************
//генерирует случайные id , которые не повторяются 
const uuid = require('uuid')
const path = require('path')

const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    //создание девайса
    async create(req, res, next) {
        try {
            //вытаскиваем из тела запроса:
            //имя, цена, id бренда, id типа, информацию
            let { name, price, brandId, typeId, info } = req.body

            //получаем файл из запроса
            const { img } = req.files
            //генерируем уникальное имя картинке
            let fileName = uuid.v4() + ".jpg"
            //перемещаем картинку в папку со статикой (resolve адаптирует указанный путь к операционной системе )
            //__dirname - путь до текущей папки, '..' - возвращают на дерикторию ниже в server 
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })

                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }

    //получение всех девайсов 
    async getAll(req, res) {
        //из тела запроса 
        let { brandId, typeId, limit, page } = req.query
        //пагинация 
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        //фильтрация по типу и бренду
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
        }
        return res.json(devices)
    }

    //получение одного девайса
    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne(
            {
                where: { id },
                //подключаем модель характеристик , для отображения на странице девайса
                include: [{ model: DeviceInfo, as: 'info' }]
            },
        )

        return res.json(device)

    }
}

module.exports = new DeviceController()