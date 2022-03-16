const axios = require('axios');
const { Router } = require('express');
const {Plataforms} = require('../db') // traer mi modelo de generos
const router = Router();

/*__GET /platforms__:
  - Obtener todos los tipos de plataformas de videojuegos posibles
*/
router.get('/', async (req,res, netx) => {   
  //console.log('estoy en __GET /platforms__:')
  plataformCreateBd() // grabar tipos de plataforma
  try{    
    const PlatfromsAllBd = await Plataforms.findAll()
    return res.status(200).send(PlatfromsAllBd);
 }catch(error) {netx(error)}
})

const plataformCreateBd = async () => {   
  //console.log('estoy en plataforma grabando')
  const platafBd = await Plataforms.findAll(); 
  let platafCreat = ['PlayStation 4','Xbox 360','PC','Xbox','Nintendo']

  if(platafBd.length===0){ // si no existe generos buscarlo en la api y rear la bd con la info

      let platafBd = platafCreat
      platafBd= platafBd.map(ele => {
      Plataforms.findOrCreate({where: {name : ele}})
      });
   }
   return (platafBd)
}
//PlatfromsCreateBd(); // Crear la base de datos Generos y luego utilizarla desde su B.D.

module.exports = router;

