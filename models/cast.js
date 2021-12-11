const {sequelize} = require('../db')
const {DataTypes, Model} = require('sequelize')
class Cast extends Model {
}

Cast.init({
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        isMainCharecter: DataTypes.BOOLEAN
},
{   sequelize,
    timestamps:false
})

module.exports = {Cast}