import axios from 'axios';
export const GET_ALL_VIDEOGAME     = 'GET_ALL_VIDEOGAME';  // Traerme todos los video games
export const GET_DETAIL_VIDEOGAME  = 'GET_ID_VIDEOGAME'    // Traerme video games por id
// 
export const GET_ALL_GENRES        = 'GET_ALL_GENRES';     // Traerme todos los video ganes
// filtros
export const FILTERS_GENRES        = 'FILTERS_GENRES';            //
export const FILTERS_VG_CREATED    =  'FILTERS_VG_CREATER';  // Filtro por video juego Creados en app
// Ordenamintos
export const SORT_DB_OR_CREATED   = 'SORT_DBF_OR_CREATED'; //
export const ORDER_BY_NAME        = 'ORDER_BY_NAME';
export const ORDER_BY_RATING      = 'ORDER_BY_RATING';


// Traer todos los video game de la api y base de datos
export function getVideoGame(name){ // payload = Id por argumento
  console.log('estoy en action getVideoGame', name)
  return async function(dispatch){    
    const getNameVideoGame = await axios.get(`http://localhost:3001/api/videogames?name=${name}`);
    return dispatch({type:GET_ALL_VIDEOGAME, payload: getNameVideoGame.data })
  }
};

// Traer todos los video game de la api y base de datos
export function getAllGenres(payload){ // payload = Id por argumento
  //console.log('estoy en action getVIDEOGAMEDetail ', payload)
  return async function(dispatch){
    const getAllGenres = await axios.get('http://localhost:3001/api/genres');
    return dispatch({type:GET_ALL_GENRES, payload: getAllGenres.data })
  }
};

// Traer el detalle del video juegos por id
export function getIdVideoGame(idVideGame){
  return async function(dispatch) {
    const getIdVideoGame = await axios.get(`http://localhost:3001/api/videogames/${idVideGame}`)
    return dispatch({type:GET_DETAIL_VIDEOGAME, payload: getIdVideoGame.data})
  }
};

// Filtrado por Generos 
export function filterGenres(valorFilter) {  // filtro por GENRESes payload valor que me llega por value
   console.log('ESTOY EN ACTION', valorFilter)
   return {type:FILTERS_GENRES, payload:valorFilter} 
}

// Filtrado por videos existente o agregado por nosotros
export function filterDbOrCrea(valorFilter) { 
   console.log('ESTOY EN ACTION', valorFilter)
   return {type:FILTERS_VG_CREATED, payload:valorFilter}
}

// ordenar alfab. por nombre o por rating
export function sortBy(sortby) {
  if(sortby==='sortAscName') {
    return {type: ORDER_BY_NAME,   payload:sortby}
  }else{                    
    return {type: ORDER_BY_RATING, payload:sortby}
  }
}

