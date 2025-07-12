// ******************************************
// Здесь описываются модели данных 
// 
// То, как они хранятся в Базе данных
// 
// ******************************************

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//Модель пользователя 
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, },
    password: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})


//Модель корзины 
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


//Модель девайса в корзине(товаров в корзине)
const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

//Модель девайса 
const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}, 
})

//Модель типа 
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

//Модель бренда 
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

//Модель рейтинга 
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})


//Модель информации о девайсе 
const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

// *********************************************************

// Описание того , как модели , которые описаны наверху ^

// связаны друг с другом: один ко многим , многие ко многим 

// и т.д.

// *********************************************************

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//Пользователь - Корзинa (один к одному) 
User.hasOne(Basket)
Basket.belongsTo(User)

//Пользователь - Рейтинг (Один ко многим)
User.hasMany(Rating)
Rating.belongsTo(User)

//Корзина - Девайсы в корзине (Один ко многим)
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

//Девайс - Девайс  в корзине(Один к одному) 
Device.hasOne(BasketDevice)
BasketDevice.belongsTo(Device)


//Девайс - Информация о девайсе (Один ко многим)
Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

//Девайс - Рейтинг (Один ко многим) 
Device.hasMany(Rating)
Rating.belongsTo(Device)

//Тип - Девайс (Много к одному)
Type.hasMany(Device)
Device.belongsTo(Type)

//Тип - Бренд (Многие ко многим)
Type.belongsToMany(Brand, { through: TypeBrand})
Brand.belongsToMany(Type, { through: TypeBrand})

//Бренд - Девайс (Много к одному)
Brand.hasMany(Device)
Device.belongsTo(Brand)

module.exports = {
    User, 
    Basket, 
    BasketDevice, 
    Device,
    DeviceInfo, 
    Type, 
    Brand,
    Rating,
    TypeBrand
}







