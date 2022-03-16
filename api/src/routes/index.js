const { Router } = require('express');
const videogames = require('./videogames')
const videogame  = require('./videogame')
const platforms  = require('./platforms')
const genres     = require('./genres')



const router = Router();

// mildelword
//console.log(videogame)
//console.log(TypesRoute)

router.use('/videogames', videogames); 
router.use('/videogame',videogame); 
router.use('/platforms',platforms);
router.use('/genres',genres);

module.exports = router;
