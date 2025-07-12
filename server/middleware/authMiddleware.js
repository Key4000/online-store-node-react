// ****************************************

//  Здесь происходит проверка ,
//  авторизован пользователь или нет
//  То есть валидный ли токен

// *****************************************

const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    //оставляем только методы POST, GET, PUT
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
       //в хедер помещают, сначала тип токена, а потом сам токен поэтому через сплит, мы сначала отделяем токен от типа, и выбераем токен 
       const token = req.headers.authorization.split(' ')[1]// Bearer nametoken
       //если токена нету отправляем ошибку
       if(!token){
           return res.status(401).json({message: 'Не авторизован'})
       }
       
       //проверяем токен на валидность
       let decoded = jwt.verify(token, process.env.SECRET_KEY)
       //добавим данные из токена
       req.user = decoded
       next()
    } catch(e) {
        //отправляем ошибку 
        res.status(401).json({message: 'Не авторизован'})
    }
}