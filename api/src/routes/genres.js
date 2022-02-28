const axios = require('axios');
const { Router } = require('express');
const {Genres} = require('../db') // traer mi modelo de generos
const router = Router();



/*
  __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos   
*/
 router.get('/', async (req,res, netx) => {   
   console.log('__GET /genres__ Creando la BD')
   try{      
    const urlGenres = await axios.get('https://api.rawg.io/api/genres?key=c763c549610a45ec98e5b661379eb5ed');
    //console.log(urlGenres.data.results)
    urlGenres.data.results.map(ele => {
        Genres.findOrCreate({where: {name : ele.name}})
     });
     const allGenresBd = await Genres.findAll();
     return res.status(200).send(allGenresBd);
  }catch(error) {netx(error)}
})

module.exports = router;
