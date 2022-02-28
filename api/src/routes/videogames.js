const axios = require('axios');
const {getVideoGameApi, getVideoGamesCreate} = require('./Services');
const { Router } = require('express');
const {Videogames,Genres} = require('../db') // traer mi modelo
const router = Router();
//console.log(Genres)


/* #### Backend */

// __POST /videogame__: - Recibe los datos recolectados desde el formulario controlado 
//  de la ruta de creación de videojuego por body, - Crea un videojuego en la base de datos
router.post('/', async (req, res, next) => {
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
      let allVideoGamesCreate = await getVideoGamesCreate(); // traer todos los V.G. creado en la app
      let allVideoGamesApi    = await getVideoGameApi();     // __GET /videogames__: Obtener un listado de los videojuegos
      let videoGamesApiyBd    =  (allVideoGamesCreate.concat(allVideoGamesApi))
      if(name) { // __GET /videogames?name="..."__: Obtener un listado de las primeros 15 videojuegos y un mesaje si no existe
        let videoGamesApiAux = videoGamesApiyBd.filter((ele) => ele.name.toLowerCase().includes(name.toLowerCase()))
        return videoGamesApiAux.length?res.status(200).send(videoGamesApiAux.slice(0,16)):res.status(404).send('Name of Video Game Not Found');
      } 
      return res.status(200).send(videoGamesApiyBd) // retornar un solo array api externa y bd
  }catch(error) {next(error)}
})

// __GET /videogame/{idVideogame}__: Obtener el detalle de un videojuego en particular / Incluir los géneros asociados
router.get('/:idVideogame', async (req,res, netx) => {
  console.log('estoy en /:idvideogame ', req.params)
  let {idVideogame} = req.params  
  try { 
       let detailvideoGamesApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=c763c549610a45ec98e5b661379eb5ed`); // __GET /videogames__: Obtener un listado de los videojuegos
       //let detailVideogame = videoGamesApi.find(ele => ele.id === Number(idVideogame)) // encontrar por id
       return res.status(200).send(detailvideoGamesApi.data)
  }catch(error) {netx(error)}
})

module.exports = router;
