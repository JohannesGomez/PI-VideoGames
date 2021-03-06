 /*--------------------------------------------
      Acciones
   --------------------------------------------*/ 
import axios from 'axios';
export const GET_ALL_VIDEOGAME     = 'GET_ALL_VIDEOGAME';  // Traerme todos los video games
export const GET_DETAIL_VIDEOGAME  = 'GET_ID_VIDEOGAME'    // Traerme video games por id
export const INIT_DETAIL_VIDEOGAME = 'INIT_DETAIL_VIDEOGAME' // inicializar el detalle del v.j
// 
export const GET_ALL_GENRES        = 'GET_ALL_GENRES';     // Traerme todos los video ganes
// 
export const GET_ALL_PLATFORMS     = 'GET_ALL_PLATFORMS';     // Traerme tipos de plataformas
// 
export const POST_VIDEOGAME        = 'POST_VIDEOGAME';     // Traerme todos los video ganes
// filtros
export const FILTERS_GENRES        = 'FILTERS_GENRES';            //
export const FILTERS_VG_CREATED    =  'FILTERS_VG_CREATER';  // Filtro por video juego Creados en app
// Ordenamintos
export const SORT_DB_OR_CREATED   = 'SORT_DBF_OR_CREATED'; //
export const ORDER_BY_NAME        = 'ORDER_BY_NAME';
export const ORDER_BY_RATING      = 'ORDER_BY_RATING';
// mensaje de error del search bar
export const VALID_SEARCH_BAR   = 'VALIDI_SEARCH_BAR'
//
export const SET_MESSAGE = 'SET_MESSAGE'
export const INI_MESSAGE = 'INI_MESSAGE'


// Traer todos los video game de la api y base de datos o listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
export function getVideoGame(name){ 
  //console.log('estoy en action getVideoGame', name)
  return async function(dispatch){  
      const getNameVideoGame = await axios.get(`/api/videogames?name=${name}`);
      //console.log('estoy en action getVideoGame', getNameVideoGame.data)
      //if(getNameVideoGame.data[0]==='error') return alert('video games not found!') 
      //if(getNameVideoGame.data[0]==='error') return {type:SET_MESSAGE, payload:msg}
      if(getNameVideoGame.data.length>0) {
        return dispatch({type:GET_ALL_VIDEOGAME, payload: getNameVideoGame.data })
      } else{
        return dispatch({type:SET_MESSAGE, payload:'video no existe!'})}

  }
};



// Traer todos los video generos de la base de datos
export function getAllGenres(){ // 
    return async function(dispatch){
    const getAllGenres = await axios.get('/api/genres');
    return dispatch({type:GET_ALL_GENRES, payload: getAllGenres.data })
  }
};

// Traer todos tipos de plataformas  base de datos
export function getAllPlatforms(){ // 
  return async function(dispatch){
    const getAllPlatforms = await axios.get('/api/platforms');
    return dispatch({type:GET_ALL_PLATFORMS, payload: getAllPlatforms.data })
  }
};

// Traer el detalle del video juegos por id
export function getIdVideoGame(idVideGame){
  console.log('estoy en action getIdVideoGame', idVideGame)
  return async function(dispatch) {
    const getIdVideoGame = await axios.get(`/api/videogame/${idVideGame}`)
    return dispatch({type:GET_DETAIL_VIDEOGAME, payload: getIdVideoGame.data})
  }
};

// Grabar los datos del formulario controlado
export function postVideoGame(payload){
  return async function(dispatch){    
      await axios.post('/api/videogame',payload); // axios.get devuelve la respuesta en un data
      return dispatch({type:POST_VIDEOGAME})
  }
};


// Inicializar los mensajes en el objeto
export function IniMessage(){
  return ({type:INI_MESSAGE})
};


// Inicializar el detalle del video juegos en el estado global
export function getInitDetailVG(){
    return ({type:INIT_DETAIL_VIDEOGAME, payload:[]})
};



// Filtrado por Generos 
export function filterGenres(valorFilter) {  // filtro por GENRESes payload valor que me llega por value
//   console.log('action filterGenres ', valorFilter)
   return {type:FILTERS_GENRES, payload: valorFilter} 
}

// Filtrado por videos existente o agregado por nosotros
export function filterDbOrCrea(valorFilter) { 
   return {type:FILTERS_VG_CREATED, payload:valorFilter}
}

// ordenar alfab. por nombre o por rating
export function sortBy(sortby) {
  if(sortby==='sortAscName' || sortby==='sortDesName') return {type: ORDER_BY_NAME,   payload:sortby};
  return {type: ORDER_BY_RATING, payload:sortby};
}

// mensaje del sistema
// export function setMessage(msg) {
//   return {type:SET_MESSAGE, payload:msg}
// }