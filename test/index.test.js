const {Movie, Cast, Crew, sequelize} = require('../src/index')

describe('Movie Database', () => {

    beforeAll(async() => {
        await sequelize.sync({force:true})

        const arrayOfMovies = [
            {name:'A Star Is Born', release_date: '2018-08-31', genre:'Musical Romantic', runtime:'136 minutes', country:'United States'},
            {name:'The Farewell', release_date: '2019-01-25', genre:'Comedy Drama', runtime:'100 minutes', country:'United States'},
            {name:'Jurassic Park', release_date: '1993-06-09', genre:'Science Fiction', runtime:'128 minutes', country:'United States'},
            {name:'Call Me By Your Name', release_date: '2017-01-22', genre:'Romantic', runtime:'132 minutes', country:'United States'},
            {name:'Jaws', release_date: '06-20-1975', genre:'Thriller', runtime:'124 minutes', country:'United States'}
        ]
        const arrayOfCasts = [
            {name:'Bradley Cooper', gender: ' Male', isMainCharecter: true},
            {name:'Awkwafina', gender: ' Female', isMainCharecter: true},
            {name: 'Tzi Ma', gender: 'Male', isMainCharecter: true},
            {name:'Whit Hertford', gender: 'Male', isMainCharecter: false},
            {name:'Armie Hammer', gender: 'Male', isMainCharecter: true},
            {name:'Verna Fields', gender: 'Male', isMainCharecter: false},
            
        ]
        const arrayOfCrews = [
            {name:'Lisa Dennis', gender: ' Female', department:'Production Management', position: 'post-production supervisor'},
            {name:'Anna Franquesa Solano', gender: ' Female', department:'Cinematography', position: 'director of photography'},
            {name:'Lynda Gurasich', gender: ' Female', department:'Makeup', position: 'hair styles supervisor'},
            {name:'Roberta Federico', gender: ' Male', department:'Art Direction', position: 'Art Director'},
            {name:'Paolo Amici', gender: ' Male', department:'Sound', position: 'sound effects editor'},
            {name:'Emanuel Bartolozzi', gender: ' Male', department:'Visual Effects', position: 'digital compositor'},
            {name:'Verna Fields', gender: 'Female', department:'Film Editing', position: 'Editor'}
        ]

        await Movie.bulkCreate(arrayOfMovies)
        await Cast.bulkCreate(arrayOfCasts)
        await Crew.bulkCreate(arrayOfCrews)
    })

    test('movie has a name', async () => {
        const testMovie = await Movie.findOne({where: {name:'A Star Is Born'}});
        expect(testMovie.name).toBe('A Star Is Born');
    })

    test('movie has a country', async () => {
        const testMovie = await Movie.findOne({where: {Country:'United States'}});
        expect(testMovie.country).toBe('United States');
    })

    test('can create a new movie', async () => {
        const testMovie = await Movie.findOne({where: {name:'Jurassic Park'}});
        expect(testMovie.genre).toBe('Science Fiction');
    })

    test('is the cast is the main charecter', async () => {
        const testCast = await Cast.findOne({where: {name:'Bradley Cooper'}});
        expect(testCast.isMainCharecter).toBeTruthy()
    })

    test('crew has a department', async () => {
        const testCrew = await Crew.findOne({where: {name:'Verna Fields'}});
        expect(testCrew.department).toBe('Film Editing')
    })

    test('movie can have many cast', async () => {
        const testMovie = await Movie.findOne({where: {name:'Call Me By Your Name'}});

        const testCast1 = await Cast.findOne({where: {name: 'Awkwafina'}})
        const testCast2 = await Cast.findOne({where: {name: 'Tzi Ma'}})

        await testMovie.addCast(testCast1)
        await testMovie.addCast(testCast2)

        const castList = await testMovie.getCasts()

        expect(castList.length).toBe(2)
        expect(castList[0] instanceof Cast).toBeTruthy()
        expect(castList[0].name).toMatch('Awkwafina')
    })

    test('movie can have many crew', async () => {
        const testMovie = await Movie.findOne({where: {name:'Call Me By Your Name'}});

        const testCrew1 = await Crew.findOne({where: {name: 'Roberta Federico'}})
        const testCrew2 = await Crew.findOne({where: {name: 'Paolo Amici'}})
        const testCrew3 = await Crew.findOne({where: {name: 'Emanuel Bartolozzi'}})

        await testMovie.addCrew(testCrew1)
        await testMovie.addCrew(testCrew2)
        await testMovie.addCrew(testCrew3)

        const crewList = await testMovie.getCrews()

        expect(crewList.length).toBe(3)
        expect(crewList[1] instanceof Crew).toBeTruthy()
        expect(crewList[1].name).toMatch('Paolo Amici')
    })

    afterAll(async()=> {
        sequelize.close()
    })

})