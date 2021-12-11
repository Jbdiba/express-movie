const {sequelize, DataTypes, Model} = require('../db')

const { Movie } = require('../models/movie')
const { Cast } = require('../models/Cast')
const { Crew } = require('../models/Crew')

Cast.belongsTo(Movie)
Movie.hasMany(Cast)

Crew.belongsTo(Movie)
Movie.hasMany(Crew)


module.exports = {Movie, Cast, Crew, sequelize}