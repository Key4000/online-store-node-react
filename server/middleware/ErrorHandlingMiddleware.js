const ApiError = require('../error/ApiError')

module.exports = function(err , req , res , next){
    //Если ошибка из класса ApiError
    if(err instanceof ApiError){    
        return res.status(err.status).json({message: err.message})
    }
    //если сюда попала ошибка не из класса ApiError
    return res.status(500).json({message: err.message})
}