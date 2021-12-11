const {sequelize} = require('../db')
const {DataTypes, Model} = require('sequelize')
class Movie extends Model {
}

Movie.init({
        name: DataTypes.CHAR(50),
        release_date: DataTypes.DATEONLY,
        genre: DataTypes.STRING,
        runtime: DataTypes.STRING,
        country: DataTypes.STRING
},
{   sequelize,
    timestamps:false
})

module.exports = {Movie}