// ******************************************************

// Основной файл , с которого происходит запуск сервера

// cors - чтобы отправлять запросы с браузера 

// ******************************************************

// Все подключения
require('dotenv').config()
const express = require('express') 
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

//Модели данных в базе данных 
const models = require('./models/models')
//подключаем основной роутер, который тянет за собой подроутеры
const router = require('./routes/index')
//подключаем middleware обработки(handling) ошибок
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


//----------------------------------------------------------

//  Тело сервера

//----------------------------------------------------------

const PORT = process.env.PORT || 5000

const app = express()


//--------------------------------------------------------------


//  Зона middleware , здесь все обработчики 
 
//  Обработчики ошибок должны быть последними в очереди

//--------------------------------------------------------------

//Подключаем корс и функцию чтобы парсить json формат
app.use(cors())
app.use(express.json())

//регистрируем middleware , чтобы загружать файлы 
app.use(fileUpload({ }))
//явно указать , что файлы из папки static раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static')))

//подключаем роутер , и первым параметро указываем маршурт по которому роутер отрабатывает 
app.use('/api', router)

//обработка ошибок , последний middleware
app.use(errorHandler)

//-----------------------------------------------------------------------------


//  Запуск сервера , функция запуска

//-----------------------------------------------------------------------------
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

