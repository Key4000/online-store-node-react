// ****************************************

//  Здесь происходит проверка ,
//  авторизован пользователь или нет
//  То есть валидный ли токен

// *****************************************
const checkToken = require('./helpers/checkToken')

module.exports = function(req, res, next){
    //оставляем только методы POST, GET, PUT
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        //проаеряем токен на валидность
       const decoded = checkToken(req, res)
       
       //добавим данные из токена
       req.user = decoded
       //переход к следующему middleware 
       next()
    } catch(e) {
        //отправляем ошибку 
        res.status(401).json({message: 'Не авторизован'})
    }
}
