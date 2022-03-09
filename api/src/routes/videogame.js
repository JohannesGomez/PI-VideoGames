const axios = require('axios');
const { Router } = require('express');
const {Videogames,Genres} = require('../db') // traer mi modelo
const router = Router();
require('dotenv').config();
const { KEY_API } = process.env; // clave api externa


/* #### Backend */

/*
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos */
router.post('/', async (req, res, next) => {
   const {name, description, released, platforms, rating, image, genresId} = req.body 
    try {
        let creaAct = await Videogames.create({ 
        name,        // Nombre
        description, // Descripcion
        released,    // Fecha de lanzamiento
        platforms,   // Plataformas
        rating,      // Rating o Clasificación
        image        // Rating o Clasificación
      });
      return res.send(await creaAct.addGenres(genresId)); //  id de generos para la relacion video juego / generos de juegos
    }catch(error) {next(error)}
    return
})


/*
- [ ] __GET /videogame/{idVideogame}__:
  - Obtener el detalle de un videojuego en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  - Incluir los géneros asociados */
router.get('/:idVideogame', async (req,res, netx) => {
  console.log('estoy en /:idvideogame ', req.params)
  let {idVideogame} = req.params  
  try { 
        // Verificar por id está en B.D. creada y mostrar el detalle
        if(idVideogame.length>30) { // pata de cabra
          let videoGamesIdBd1 = await getVideoGamesIdBd(idVideogame)  // verifcar si existe b.d. y traer el detalle
          console.log('detail ByPk ', videoGamesIdBd1)        
          return res.status(200).send(videoGamesIdBd1)
        }
        let videoGamesIdApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${KEY_API}`); // __GET /videogames__: Obtener un listado de los videojuegos
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
