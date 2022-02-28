const { Router } = require('express');
const videogames = require('./videogames')
const genres   = require('./genres')


const router = Router();

// mildelword
//console.log(videogames)
//console.log(TypesRoute)

router.use('/videogames', videogames); // /api/Pokemos/* todo lo que tenga adentro
router.use('/genres',genres);


module.exports = router;
