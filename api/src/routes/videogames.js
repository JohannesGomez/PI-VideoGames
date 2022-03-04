const axios = require('axios');
const {getVideoGamesApi, getVideoGamesBd, getVideoGamesIdBd} = require('./Services');
const { Router } = require('express');
const {Videogames,Genres} = require('../db') // traer mi modelo
const router = Router();
//console.log(Genres)


/* #### Backend */

// __POST /videogame__: - Recibe los datos recolectados desde el formulario controlado 
//  de la ruta de creación de videojuego por body, - Crea un videojuego en la base de datos
router.post('/', async (req, res, next) => {
  console.log('estoy en post')
  const {name, description, released, plataforms, rating, image, idGenres} = req.body 
  try {
      let creaAct = await Videogames.create({ 
        name,        // Nombre
        description, // Descripcion
        released,    // Fecha de lanzamiento
        plataforms,  // Plataformas
        rating,      // Rating o Clasificación
        image        // Rating o Clasificación
      });
      //idGenres    //  id de generos para la relacion video juego / generos de juegos
      return res.send(await creaAct.addGenres(idGenres));
  }catch(error) {next(error)}
})

//__GET /videogames__: Obtener un listado de los videojuegos API / Debe devolver solo los datos necesarios para la ruta principal
router.get('/', async (req, res, next) => {
  let {name} = req.query // obtener el nombre del video juego a buscar mostrar solo primeros 15 v.j
 
  try {   
      let allVideoGamesApi     = await getVideoGamesApi(); // traer todos los V.G. API
      let allVideoGamesBd      = await getVideoGamesBd(); // traee
      let allVideoGamesApiyBd  = [...allVideoGamesApi, ...allVideoGamesBd]; // todos los v.g. api y bd
      if(name) { // __GET /videogames?name="..."__: Obtener un listado de las primeros 15 videojuegos y un mesaje si no existe
         console.log('/Back/ __GET /videogames?name="..."', name)
         console.log('/Back/ __GET /videogames?name="..."__: Obtener un listado de las primeros 15 videojuegos y un mesaje si no existe')
         let videoGamesApiAux = allVideoGamesApiyBd.filter((ele) => ele.name.toLowerCase().includes(name.toLowerCase()))
         return videoGamesApiAux.length?res.status(200).send(videoGamesApiAux.slice(0,16)):res.status(404).send('Name of Video Game Not Found');
       } 
      console.log('/Bakc/ __GET /videogames Listado de todos video games ap y bd')
      return res.status(200).send(allVideoGamesApiyBd) // retornar todos los v.g. api y bd
  }catch(error) {next(error)}
})

// __GET /videogame/{idVideogame}__: Obtener el detalle de un videojuego en particular / Incluir los géneros asociados
router.get('/:idVideogame', async (req,res, netx) => {
  console.log('estoy en /:idvideogame ', req.params)
  let {idVideogame} = req.params  
  try { 
        // Verificar si el id está en B.D. creada
        // '4036b0e6-8016-4d7d-9052-84a25b41aed5'
        if(idVideogame.length>30) { // pata de cabra
          //   let detailIdDb = await Videogames.findByPk(idVideogame, {
          //     include: Genres
          //   })
          //   const VideoGamesBdAll = detailIdDb.map((e) =>{
          //     return {
          //     id          : e.id,
          //     name        : e.name,
          //     rating      : e.rating,
          //     image       : e.image,
          //     genres      : e.genres.map(e => e.name),
          //     description : e.description,
          //     released    : e.released,
          //     created     : e.created,
          //     platforms   : e.platforms 
          // }})      
          // let prueba = detailIdDb.genres.map(e => e.name)    
          let videoGamesIdBd1 = await getVideoGamesIdBd(idVideogame)  
          console.log('detail ByPk ', videoGamesIdBd1)        
          return res.status(200).send(videoGamesIdBd1)
        }
      
       
        let videoGamesIdApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=39307bdabb8c4602a5eb072b33ab8fbb`); // __GET /videogames__: Obtener un listado de los videojuegos
        const detailVideoGame = {
         id         : videoGamesIdApi.data.id,
         name       : videoGamesIdApi.data.name,
         image      : videoGamesIdApi.data.background_image,
         rating     : videoGamesIdApi.data.rating,
         released   : videoGamesIdApi.data.released,//
         description: videoGamesIdApi.data.description,
         genres     : videoGamesIdApi.data.genres.map(g => g.name),
         platforms  : videoGamesIdApi.data.platforms.map(p => p.platform.name)
        }       
       return res.status(200).send(detailVideoGame)
  }catch(error) {netx(error)}
})


module.exports = router;


//  Tenerlo para incluirlo a una libreria
/* Botones/Opciones para ordenar tanto ascendentemente como 
// descendentemente los videojuegos por orden alfabético y por rating */
// router.get('/orderby/:typeorder', async (req,res, netx) => {
//   const {typeorder} = req.params  // llegar el tipo de ordenamiento 
//   try {
//     console.log('estoy GET/orderby en ordenamientos des o asc alfabeticamente ')
//        const videoGameOrder = await Videogames.findAll({
//          order: [['name', typeorder]] // campo a ordenar y el tipó de orenamiento (ASCE || DESC)
//        })
//        return res.status(200).send(videoGameOrder) // datos ordenados
//   }catch(error) {netx(error)}
// })
