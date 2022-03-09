const axios = require('axios');
const { Router } = require('express');
const {Plataforms} = require('../db') // traer mi modelo de generos
const router = Router();

/*__GET /platforms__:
  - Obtener todos los tipos de plataformas de videojuegos posibles
*/
router.get('/', async (req,res, netx) => {   
  //console.log('estoy en __GET /platforms__:')
  try{    
    const PlatfromsAllBd = await Plataforms.findAll()
    return res.status(200).send(PlatfromsAllBd);
 }catch(error) {netx(error)}
})

//PlatfromsCreateBd(); // Crear la base de datos Generos y luego utilizarla desde su B.D.

module.exports = router;