const axios = require('axios')
const videogames = require('./videogames')
const genres     = require('./genres')
const { Videogames, Genres} = require('../db.js')

// __GET /videogames__: Obtener un listado de los videojuegos
const getVideoGameApi = async (req,res,netx) => {
    console.log('__GET /videogames__: Obtener un listado de los videojuegos')
    try{
        let videoGamesApi = [] // guardará en array todos los v.j de la api
        let nexturl = 'https://api.rawg.io/api/games?key=c763c549610a45ec98e5b661379eb5ed' // endpoint toda la data api
        let TotalDatosApi = 1 // contador total registro a agregar o traer de la api
        while (TotalDatosApi < 100) { // determina cantidad registro que se debe  traer de la api
                let allVideoGames = await axios.get(nexturl);
                allVideoGames.data.results.map( eleApi => { // voy a la info de la api para ingresar a la data especifica y mapeo los objetos dentro del array results
                TotalDatosApi++       
                videoGamesApi.push({     // agregar la nueva registro al arreglo
                id        : eleApi.id,                // id 
                name      : eleApi.name,              // nombre
                image     : eleApi.background_image,  // en lo de otros dice brack_ground
                released  : eleApi.released,          // Fecha de lanzamiento
                rating    : eleApi.rating,            // clasificacion
                genres    : eleApi.genres.map(eleGen => eleGen.name),                 // mapear los generos
                platforms : eleApi.platforms.map(eleplatf=> eleplatf.platform.name)}) // mapear las plataformas
                })
                nexturl = allVideoGames.data.next // proxima pagina
            }
            //console.log(VideoGamesApi)
        return (videoGamesApi) // retornar los primero 100 info api
    }catch(error) {netx(error)}
}

// Traer de la B.D. todos los video games
const getVideoGamesCreate = async (req,res, netx) => {
    try{
        const allVideoGamesCreate = await Videogames.findAll({
            include: Genres
        });
        return (allVideoGamesCreate)
   }catch(error) {netx(error)}
}

module.exports = {
    getVideoGameApi,
    getVideoGamesCreate,
 //   getDbInfo,
 //   getAllPokemons
}