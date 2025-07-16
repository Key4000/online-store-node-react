const jwt = require('jsonwebtoken')

module.exports = function(req, res){
   //в хедер помещают, сначала тип токена, а потом сам токен поэтому через сплит, мы сначала отделяем токен от типа, и выбераем токен 
    const token = req.headers.authorization.split(' ')[1]

    //если токена нету отправляем ошибку
    if (!token) {
       return res.status(401).json({ message: 'Не авторизован' })
    }

    //проверяем токен на валидность
    const decoded = jwt.verify(token, process.env.SECRET_KEY) 
    
    return decoded   
}
