import axios from 'axios';
export const GET_ALL_VIDEOGAME = 'GET_ALL_VIDEOGAME';  // Traerme todos los video ganes
//
export const GET_ALL_GENRES    = 'GET_ALL_GENRES';  // Traerme todos los video ganes
//



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



// export function getNameVIDEOGAME(name){
//   return async function (dispatch){
//     try {
//       var json = await axios.get(`http://localhost:3001/countries?name=${name}`);
//       console.log(json.data)
//       return dispatch({type:GET_NAME_VIDEOGAME, payload:json.data}) 
//     } catch (error) {console.log('eeeeeerrrrrrrorrrrrrrr')}
//   }
// }


// // Traerme todo las actividades. Hacer la conexion al Back 
// export function getAllCREATE(){
//   return async function(dispatch){
//       var allVIDEOGAME = await axios.get("http://localhost:3001/VIDEOGAME"); // axios.get devuelve la respuesta en un data
//       //console.log('estoy en action getAllActivitie', allVIDEOGAME.data)
//      return dispatch({ type:GET_ALL_VIDEOGAME, payload: allVIDEOGAME.data
//    })
//   }
// };

// // crear la actividades y su relacion con los paises selecconados
// export function postCREATE(payload){
//   //console.log('estoy postCREATE1 ', payload);
//   return async function(dispatch){    
//       var postVIDEOGAME = await axios.post("http://localhost:3001/VIDEOGAME",payload); // axios.get devuelve la respuesta en un data
//      // console.log('estoy postCREATE2 ', postVIDEOGAME)
//       return dispatch({ type:POST_VIDEOGAME})
//   }
// };




// filtrado por GENRESe
// export function filters(valorFilter) {  // filtro por GENRESes payload valor que me llega por value
//   //console.log('estoy en la action', valorFilter)
//     return {type:FILTERS, payload:valorFilter} 
// }

// // ???
// export function filterByCreated(valorFilter) {
//   return {type:FILTER_CREATED, payload:valorFilter}
// }

// // filtrado por actividades
// export function filterByAvtivities(valorFilter) {
//     //console.log('estoy en action filterByAvtivities ', valorFilter)
//    return {type: FILTER_BY_CREATE, payload:valorFilter}
// }

 // ordenar alfabetica ascendente o descente name y por rating
//  export function orders(payload) {
//     return {type: ORDER_BY_ALPH_NAME, payload}
//  }

// // ordenar de paises de forma alfabetica ascendente o descente name RATIlatio
// export function orderByRATIVIDEOGAME(payload) {
//   return {type: ORDER_BY_ALPH_RATI, payload}
// }