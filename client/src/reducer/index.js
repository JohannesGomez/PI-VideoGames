// Importa las actions types que necesites acá:
import {GET_ALL_VIDEOGAME, GET_ALL_GENRES, GET_DETAIL_VIDEOGAME, 
        FILTERS_GENRES, FILTERS_VG_CREATED, ORDER_BY_NAME,
        INIT_DETAIL_VIDEOGAME, ORDER_BY_RATING} from "../actions";
 
const initialState = {
     videoGamesAllSG    :[],  // Video Game estado global api i bd
     videoGamesAuxSG    :[],  // Video Game estado global api i bd auxiliar para utilizar en los filtros
     videoGamesDetailSG :[],  // Detalla del video juego
     genresSG: [] // Genres estado global
};

//
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
          case GET_ALL_VIDEOGAME: //  todos los videos games api y bd
               return {...state, videoGamesAllSG : action.payload, videoGamesAuxSG : action.payload}
          case GET_DETAIL_VIDEOGAME: // Detalle del video games
               //console.log('estot en el reduce GET_DETAIL_VIDEOGAME', action.payload)
               return {...state, videoGamesDetailSG: action.payload}
          case INIT_DETAIL_VIDEOGAME: // Inicializar el arreglo del detalle del vj
               //console.log('REDUCER : INIT_DETAIL_VIDEOGAME ')
               return{...state, videoGamesDetailSG:[]}
          case GET_ALL_GENRES: // Generos
               return {...state, genresSG : action.payload}
          case FILTERS_GENRES: // Filtrado video juegos por Generos
               let videoGamesAllAux1FSG = state.videoGamesAuxSG // guadar en uan variable todos lo v.j. del estado para filtrarlos
               let filtersVgGenres = videoGamesAllAux1FSG.filter(ele => ele.genres.includes(action.payload))
               return {...state, videoGamesAllSG: filtersVgGenres}
          case FILTERS_VG_CREATED: // Filtrado por vide juegos existentes
               let videoGamesAllAux2FSG = state.videoGamesAuxSG
               let filtersVgCreated =  action.payload==='filtCrea' ?
               videoGamesAllAux2FSG.filter(ele => ele.created===true): state.videoGamesAuxSG
               console.log('REDUCER : FILTERS_VG_CREATED', filtersVgCreated)
               return {...state, videoGamesAllSG: filtersVgCreated}
          case ORDER_BY_NAME:   //  ordenamiento ascendente name country
               /*se declara un arreglo y se pregunta por el tiopo de ordenamiento
               accede a mis estado global videoGamesAuxSG que se está renderizando
               y hacerle un (sort)
               sort = compara dos valores el campo (name) e ir comprando y colocando
               a la derecha o izquierda o despues en el arreglo
               */
               //console.log('REDUCER : ORDER_BY_NAME', action.payload)
               // ordenar Ascentedente por name o ratin
               let orderArray = action.payload === 'sortAscName' ?
                  state.videoGamesAllSG.sort(function (a, b) {
                     if (a.name > b.name)  return 1; 
                     if (b.name > a.name)  return -1;
                     return 0; // si son igules los deja como esta
                }) :  // si no es 'asce' entonces ordena 'desc'
                state.videoGamesAllSG.sort(function (a, b) {
                     if (a.name > b.name) return -1;
                     if (b.name > a.name) return 1;
                     return 0;
                })
                return {...state,videoGamesAllSG: orderArray}
          case ORDER_BY_RATING:   //  ordenamiento ascendente name country
               /*se declara un arreglo y se pregunta por el tiopo de ordenamiento
               accede a mis estado global videoGamesAuxSG que se está renderizando
               y hacerle un (sort)
               sort = compara dos valores el campo (name) e ir comprando y colocando
               a la derecha o izquierda o despues en el arreglo
               */
               //console.log('REDUCER : ORDER_BY_RATING', action.payload)
               // ordenar Ascentedente por name o ratin
               let orderArray2 = action.payload === 'sortAscRati' ?
               state.videoGamesAllSG.sort(function (a, b) {
                   if (a.rating > b.rating)  return 1; 
                   if (b.rating > a.rating)  return -1;
                   return 0; // si son igules los deja como esta
               }) :  // si no es 'asce' entonces ordena 'desc'
               state.videoGamesAllSG.sort(function (a, b) {
                   if (a.rating > b.rating) return -1;
                   if (b.rating > a.rating) return 1;
                   return 0;
               })
               return {...state,videoGamesAllSG: orderArray2}

       default:return state;
   }
}

export default rootReducer;

