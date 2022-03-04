const axios = require('axios')
const videogames = require('./videogames')
const genres     = require('./genres')
const { Videogames, Genres} = require('../db.js')

// __GET /videogames__: Obtener un listado de los videojuegos
const getVideoGamesApi = async () => {
     //console.log('Srevices getVideoGamesApi')
        let videoGamesApi = [] // guardará en array todos los v.j de la api
        let nexturl = 'https://api.rawg.io/api/games?key=39307bdabb8c4602a5eb072b33ab8fbb' // endpoint toda la data api
        let TotalDatosApi = 1 // contador total registro a agregar o traer de la api
        while (TotalDatosApi < 35) { // determina cantidad registro que se debe  traer de la api
                let allVideoGames = await axios.get(nexturl);
                allVideoGames.data.results.map( eleApi => { // voy a la info de la api para ingresar a la data especifica y mapeo los objetos dentro del array results
                TotalDatosApi++       
                videoGamesApi.push({     // agregar la nueva registro al arreglo
                id        : eleApi.id,                // id 
                name      : eleApi.name,              // nombre
                image     : eleApi.background_image,  // en lo de otros dice brack_ground
                released  : eleApi.released,          // Fecha de lanzamiento
                rating    : eleApi.rating,            // clasificacion
                genres    : eleApi.genres.map(ele => ele.name),                 // mapear los generos
                //genres    : {name : eleApi.genres.map(ele => ele.name)},                 // mapear los generos
                platforms : eleApi.platforms.map(ele=> ele.platform.name)}) // mapear las plataformas
                })
                nexturl = allVideoGames.data.next // proxima pagina
            }
            //console.log(VideoGamesApi)
        return (videoGamesApi) // retornar los primero 100 info api
}

// Traer de la B.D. todos los video games
const getVideoGamesBd= async () => {
    
   const allVideoGamesBd = await Videogames.findAll({
          include: Genres // crear la relacion agrega al arreglo los generos relacionado al video juego
   });
   
   const VideoGamesBdAll = allVideoGamesBd.map((ele) =>{
    return {
    id          : ele.id,
    name        : ele.name,
    rating      : ele.rating,
    image       : ele.image,
    genres      : ele.genres.map(e => e.name),
    description : ele.description,
    released    : ele.released,
    created     : ele.created,
    platforms   : ele.platforms 
}})       
   console.log('estoy en Services getVideoGamesBd ',VideoGamesBdAll)
   return (VideoGamesBdAll)
};

// Traer de la B.D. los video games pr id
const getVideoGamesIdBd = async (idVideogame) => {
    
    const videoGamesIdBd = await Videogames.findByPk(idVideogame, {
           include: Genres // crear la relacion agrega al arreglo los generos relacionado al video juego
    });
    
    const videoGamesIdBd2 = 
     {
     id          : videoGamesIdBd.id,
     name        : videoGamesIdBd.name,
     rating      : videoGamesIdBd.rating,
     image       : videoGamesIdBd.image,
     genres      : videoGamesIdBd.genres.map(e => e.name),
     description : videoGamesIdBd.description,
     released    : videoGamesIdBd.released,
     created     : videoGamesIdBd.created,
     platforms   : videoGamesIdBd.platforms 
    }      
    console.log('estoy en Services getVideoGamesIdBd ',videoGamesIdBd2)
    return (videoGamesIdBd2)
 };
 
module.exports = {
    getVideoGamesApi,
    getVideoGamesBd,
    getVideoGamesIdBd
 //   getDbInfo,
 //   getAllPokemons
}