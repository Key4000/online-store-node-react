// ****************************************

const authMiddleware = require('./authMiddleware')

//    Проверка роли пользователя 
//    Админ или юзер 

// *****************************************

const jwt = require('jsonwebtoken')

// *********************************************

//  Здесь надо вынести функционал 
//  в отдельную функцию , так как она 
//  используется в authMiddleware

// *********************************************

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            //в хедер помещают, сначала тип токена, а потом сам токен поэтому через сплит, мы сначала отделяем токен от типа, и выбераем токен 
            const token = req.headers.authorization.split(' ')[1]
            //если токена нету отправляем ошибку
            if (!token) {
                return res.status(401).json({ message: 'Не авторизован' })
            }
            //проверяем токен на валидность
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Нет доступа' })
            }
            //добавим данные из токена
            req.user = decoded

            next()
        } catch (e) {
            //отправляем ошибку 
            res.status(401).json({ message: 'Не авторизован' })
        }
    }
}

