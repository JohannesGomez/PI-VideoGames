// Importa las actions types que necesites acá:
import {GET_ALL_VIDEOGAME, GET_ALL_GENRES, GET_ALL_PLATFORMS, GET_DETAIL_VIDEOGAME, 
        POST_VIDEOGAME, FILTERS_GENRES, FILTERS_VG_CREATED, ORDER_BY_NAME,
        INIT_DETAIL_VIDEOGAME, ORDER_BY_RATING} from "../actions";
 
const initialState = {
     videoGamesSG    :[], // Video Game estado global api i bd
     videoGamesAuxSG    :[], // Video Game estado global api i bd auxiliar para utilizar en los filtros
     videoGamesDetailSG :[], // Detalla del video juego
     genresSG: [],           // Genres estado global
     platformsSG: [],        // Plataformas estado global
     errorSG: {}             // Control de error para el searchs estado global
};

//
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
          case GET_ALL_VIDEOGAME: //  todos los videos games api y bd
               //console.log('estoy REDUCER GET_ALL_VIDEOGAME ', action)
               return {...state, videoGamesSG : action.payload, videoGamesAuxSG : action.payload}
          case GET_DETAIL_VIDEOGAME: // Detalle del video games
               //console.log('estot en el reduce GET_DETAIL_VIDEOGAME', action.payload)
               return {...state, videoGamesDetailSG: action.payload}
          case INIT_DETAIL_VIDEOGAME: // Inicializar el arreglo del detalle del vj
               //console.log('REDUCER : INIT_DETAIL_VIDEOGAME ')
               return{...state, videoGamesDetailSG:[]}
          case GET_ALL_GENRES: // Generos
               //console.log('REDUCER : GET_ALL_GENRES: ', action.payload)
               return {...state, genresSG : action.payload}
          case GET_ALL_PLATFORMS: // Generos
               //console.log('REDUCER : GET_ALL_PLATFORMS: ', action.payload)
               return {...state, platformsSG : action.payload}
          case POST_VIDEOGAME: // Inicializar el arreglo del detalle del vj
               //console.log('REDUCER : POST_VIDEOGAME ',action.payload)
               return{...state}
          case FILTERS_GENRES: // Filtrado video juegos por Generos
               //console.log('REDUCER : SIN FILTERS_GENRES:', action.payload)
               let filtersVgGenres = state.videoGamesAuxSG.filter(ele => ele.genres.includes(action.payload))
               console.log('REDUCER : CON FILTERS_GENRES:', filtersVgGenres)
               return {...state, videoGamesSG: filtersVgGenres}
          case FILTERS_VG_CREATED: // Filtrado por vide juegos existentes
               //let videoGamesAllAux2FSG = state.videoGamesAuxSG
               let filtersVgCreated =  action.payload==='filtCrea' ?
               state.videoGamesAuxSG.filter(ele => ele.created===true): state.videoGamesAuxSG
               console.log('REDUCER : FILTERS_VG_CREATED', state)
               return {...state, videoGamesSG: filtersVgCreated}
          case ORDER_BY_NAME:   //  ordenamiento ascendente name country
               /*se declara un arreglo y se pregunta por el tiopo de ordenamiento
               accede a mis estado global videoGamesAuxSG que se está renderizando
               y hacerle un (sort)
               sort = compara dos valores el campo (name) e ir comprando y colocando
               a la derecha o izquierda o despues en el arreglo
               */
               console.log('REDUCER : ORDER_BY_NAME 1', action.payload)
               // ordenar Ascentedente por name o ratin
               let orderArrayName = action.payload === 'sortAscName' 
               ?
                  state.videoGamesSG.sort(function (a, b) {
                  return a.name.localeCompare(b.name)})
               :
                  // si no es 'asce' entonces ordena 'desc'
                  state.videoGamesSG.sort(function (a, b) {
                  return b.name.localeCompare(a.name)})

               console.log('REDUCER : ORDER_BY_NAME YA ORDENADO :', orderArrayName)
               return {...state,videoGamesSG: orderArrayName}
          case ORDER_BY_RATING:   //  ordenamiento ascendente name country
               /*se declara un arreglo y se pregunta por el tiopo de ordenamiento
               accede a mis estado global videoGamesAuxSG que se está renderizando
               y hacerle un (sort)
               sort = compara dos valores el campo (name) e ir comprando y colocando
               a la derecha o izquierda o despues en el arreglo
               */
               //console.log('REDUCER : ORDER_BY_RATING', action.payload)
               // ordenar Ascentedente por name o ratin
               let orderArrayRating = action.payload === 'sortAscRati' ?
               state.videoGamesSG.sort(function (a, b) {
                   if (a.rating > b.rating)  return 1; 
                   if (b.rating > a.rating)  return -1;
                   return 0; // si son igules los deja como esta
               }) :  // si no es 'asce' entonces ordena 'desc'
               state.videoGamesSG.sort(function (a, b) {
                   if (a.rating > b.rating) return -1;
                   if (b.rating > a.rating) return 1;
                   return 0;
               })
               return {...state,videoGamesSG: orderArrayRating}

       default:return state;
   }
}

export default rootReducer;

