// ****************************************

//    Проверка роли пользователя 
//    Админ или юзер 

// *****************************************

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            //проверяем токен на валидность
            const decoded = checkToken(req, res)
            
            //проверка роли у пользователя 
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Нет доступа' })
            }
            
            //добавим данные из токена
            req.user = decoded
            
            //переход к следующему middleware
            next()
        } catch (e) {
            //отправляем ошибку 
            res.status(401).json({ message: 'Не авторизован' })
        }
    }
}