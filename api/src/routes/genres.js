const axios = require('axios');
const { Router } = require('express');
const {Genres,VideoGames} = require('../db') // traer mi modelo de generos
const router = Router();



 /*__GET /genres__:
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos 
 */
 const GenresCreateBd = async () => {   
    const GenresBd = await Genres.findAll(); 
    if(!GenresBd){ // si no existe generos buscarlo en la api y rear la bd con la info
        console.log('estoy GenresCreateBd por primera vez ', GenresBd)
        let GenresBd2 = await axios.get('https://api.rawg.io/api/genres?key=39307bdabb8c4602a5eb072b33ab8fbb');
        GenresBd = GenresBd2.data.results.map(ele => {
        Genres.findOrCreate({where: {name : ele.name}})
        });
     }
     return (GenresBd)
}

/*__GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
*/
router.get('/', async (req,res, netx) => {   
  try{    
    const GenresAllBd = await Genres.findAll()
    return res.status(200).send(GenresAllBd);
 }catch(error) {netx(error)}
})

GenresCreateBd(); // Crear la base de datos Generos y luego utilizarla desde su B.D.

module.exports = router;
