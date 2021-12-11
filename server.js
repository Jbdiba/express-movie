const express = require('express')
const path = require('path')
const {Movie, Cast, Crew} = require('./src/index')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/Movie', async (req,res) => {
    const allMovies = await Movie.findAll()
    res.json(allMovies)
})

app.get('/Cast', async (req,res) => {
    const allCasts = await Cast.findAll()
    res.json(allCasts)
})

app.get('/Crew', async (req,res) => {
    const allCrews = await Crew.findAll()
    res.json(allCrews)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})