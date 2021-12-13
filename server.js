const express = require('express')
const path = require('path')
const {Movie, Cast, Crew} = require('./src/index')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//return all movies
// should search by: http://localhost:3000/Movie
app.get('/movie', async (req,res) => {
    const allMovies = await Movie.findAll()
    res.json(allMovies)
})

//return all casts
// should search by: http://localhost:3000/Cast
app.get('/cast', async (req,res) => {
    const allCasts = await Cast.findAll()
    res.json(allCasts)
})

//return all crews
// should search by: http://localhost:3000/Crew
app.get('/crew', async (req,res) => {
    const allCrews = await Crew.findAll()
    res.json(allCrews)
})

// return one movie by id
// should search by: http://localhost:3000/Movie/1
app.get('/Movie/:id', async(req,res)=>{
    const thisMovie = await Movie.findByPk(req.params.id)
    res.json(thisMovie)
})

// return one crew by name
// should search by: http://localhost:3000/Crew-crewName/Lisa Dennis
app.get('/Crew-crewName/:name', async(req,res)=>{
    const thisCrew = await Crew.findOne({where:{name: req.params.name}})
    res.json(thisCrew)
})

//returns result of a search
//should search by: http://localhost:3000/search?name=Jurassic Park
app.get('/search', async (req,res) => {
    let results = []
    if (req.query.name){
        results = await Movie.findAll({where:{name: req.query.name}})
    }
    else if (req.query.genre){
        results = await Movie.findAll({where:{genre:req.query.genre}})
    }
    res.json(results)
})

// //create one crew
// app.post('/crew', async (req,res) => {
//     let newCrew = await Crew.create(req.body)
//     res.send(newCrew ? 'Crew created': 'post failed')
// })

// //update one musician by id
// app.put('/crew/:id', async (req,res) => {
//     let updatedCrew = await Crew.update(req.body, {
//         where: {id: req.params.id}
//     })
//     res.send("Updated!")
// })

//delete one movie by id
app.delete('/cast/:id', async (req,res) =>{
    await Cast.destroy({
        where: {id: req.params.id}
    })
    res.send("Deleted")
})

//delete one movie by id
app.delete('/Crew/:id', async (req,res) =>{
    await Crew.destroy({
        where: {id: req.params.id}
    })
    res.send("Deleted")
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})