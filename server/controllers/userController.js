//****************************************************

//  Контроллер с функциями 

//  (отделяем логику от роутера , 
//     чтобы легче было менять потом логику)

//  Класс используем для того , чтобы сгруппировать
//     функции в одном месте
//****************************************************
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, Basket } = require('../models/models')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h'}
    )
}

class UserController {
    // *******************************************************

    //     Сделать полноценную валидацию здесь 


    // *********************************************************

    //регистрация 
    async registration(req, res, next) {
        const { email, password, role } = req.body
        //если пароля и емейла нету
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        //проверить если такой емейл есть
        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        //хешируем пароль (пароль, сколько раз хешируем - 5 раз)
        const hashPassword = await bcrypt.hash(password, 5)

        //создаем пользователя
        const user = await User.create({ email, role, password: hashPassword })
        //создаем для пользователя корзину
        const basket = await Basket.create({ userId: user.id })
        //генерируем токен
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({ token })
    }

    //авторизация
    async login(req, res, next) {
        //вытаскиваем емаил и пасс из тела запроса  
        const { email, password } = req.body
        //ищем юзера по емэйлу 
        const user = await User.findOne({ where: { email } })
        if (!user) {
            next(ApiError.internal('пользователь с таким email не найден'))
        }
        //сравниваем пароли(1 аргумент, пароль что написал пользователь, 2 пароль из базы данных)
        let comparePassword = bcrypt.compareSync(password, user.password)
        //если пароли не совпадают выдаем ошибку через функцию некст 
        if (!comparePassword) {
            next(ApiError.internal('пароль не верный'))
        }
        //генерируем jwt токен
        const token = generateJwt(user.id, user.email, user.role)

        //возвращаем json
        return res.json({ token })
    }

    //функция сводится к перезаписи токена
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }



}

module.exports = new UserController()