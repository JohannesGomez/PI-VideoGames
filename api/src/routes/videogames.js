const axios = require('axios');
const {getVideoGamesApi, getVideoGamesBd} = require('./services/utiles');
const {Router} = require('express');
const {Videogames,Genres} = require('../db') // traer mi modelo
const router = Router();
const {KEY_API} = process.env; // clave api externa

/* #### Backend */


/*
- [ ] __GET /videogames__:
  - Obtener un listado de los videojuegos
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
  - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego mostrar un mensaje adecuado */

router.get('/', async (req, res, next) => {
  let {name} = req.query // obtener el nombre del video juego a buscar mostrar solo primeros 15 v.j
  try {   
      let allVideoGamesApi    = await getVideoGamesApi(); // traer todos los V.G. API
      let allVideoGamesBd     = await getVideoGamesBd(); // traee
      let allVideoGamesApiyBd = [...allVideoGamesApi, ...allVideoGamesBd]; // todos los v.g. api y bd
      if(name) { // __GET /videogames?name="..."__: Obtener un listado de las primeros 15 videojuegos y un mesaje si no existe
         let videoGamesApiAux = allVideoGamesApiyBd.filter((ele) => ele.name.toLowerCase().includes(name.toLowerCase()))
         console.log('/Back/ __GET /videogames Listado 15 video games ap y bd ', videoGamesApiAux.length)         
         
         if(videoGamesApiAux.length===0) videoGamesApiAux.push('error')

         return res.status(200).send(videoGamesApiAux.slice(0,16))
      }        
      return res.status(200).send(allVideoGamesApiyBd) // retornar todos los v.g. api y bd
  }catch(error) {next(error)}
})
module.exports = router;
