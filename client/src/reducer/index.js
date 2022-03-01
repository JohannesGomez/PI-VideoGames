// Importa las actions types que necesites acá:
import {GET_ALL_VIDEOGAME, GET_ALL_GENRES} from "../actions";
 
const initialState = {
    videoGamesSG1: [],  // Video Game estado global
    genresSG: []  // Genres estado global
};

//
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        // Acá va tu código:
        case GET_ALL_VIDEOGAME: // 
        console.log('estoy en reducer GET_ALL_VIDEOGAME PAYLOAD ', action.payload)
        
        return {
             ...state, videoGamesSG1 : action.payload
        }
        
        case GET_ALL_GENRES: // Generos
             console.log('estoy en reducer GET_ALL_GENRES ', action.payload)
             
            return {
                 ...state, genresSG : action.payload
            }     
    
       default:return state;
   }
}

export default rootReducer;
