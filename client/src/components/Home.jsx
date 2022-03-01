import { useState, useEffect } from "react"; // Hooks
import {useDispatch, useSelector} from 'react-redux';
import { getVideoGame, getAllGenres,filters,orders } from "../actions"; // importar la accion
import Card from "./Card";
import Paginado from "./Paginado";
import {Link} from 'react-router-dom';
import SearchBar from "./SeachBar";
import stylesHome   from './styles/Home.module.css';
import stylesFilter from './styles/Filters.module.css'
import stylesGrid from './styles/Grid.module.css';

/*
  que tengo que traerme de back primero para hacer toda la logica de la barra de busqueda ?
  traer la ruta de name..la logica en la accion
*/

export default function Home() {
    
    const dispatch      = useDispatch(); // declara la constante dispacth y asi despachar las acciones
    const allVideoGames = useSelector((state) => state.videoGamesSG1); // Traer toda la data de paises de mi estado global / mapStateToProps
      //   P A G I N E O 
      // Para el paginado hay que crear varios estado globales
      // currentPage(mi estado actual) ,setCurrentPage(setea mi estado)
      const [currentPage,  setCurrentPage]  = useState(1)  // si es estado local 1 debido a que arranca en la primera pagina
      const [videoGamesPerPage, setVideoGamesPerpage] = useState(15) // estado que determina cuantos cartas por pagina será un arreglo de 6 posiciones
 
      const indexOfLastCard   = currentPage * videoGamesPerPage       // 6 // por la cantidad de personajes por pagina. 
      const indexOfFirstCard  = indexOfLastCard - videoGamesPerPage   //0 // indice del primer elemento
      const currentVideoGames = allVideoGames.slice(indexOfFirstCard,indexOfLastCard)     

      const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
     }               

    // Traer del estado global mis paises cuando el componente de monta
    useEffect (()=> {
        dispatch(getVideoGame('')); // ejecutar la accion de forma invocada  // mapDispatchToProps
        //dispatch(getAllGenres());
    },[dispatch]);   // se incluye en el arreglo lo que depende de componente didmount
            // te montas siempre cuando suceda esto
   
  

    return (
        <div>
           {/* Menu de Navegacion*/}
            <nav className={stylesHome.navbar}>
                 <div className={stylesHome.create}>
                     <Link to='/CreateVideoGame'><button className={stylesFilter.createButton}>Create Video Games</button></Link>
                </div>
                
            </nav>
            {/* Renderizar el componente de Paginado y le paso el estado de mi pagona
                  VideoGamesPerPage =  pasa el estado declarado arriba de cartas por pagina
                  allVideoGames =  pasa el valor numerico de toda mi informacion del arreglo 
                  paginado     =  pasa mi constante paginado
            */}
            <div className={stylesHome.pages}>
               <Paginado 
                         videoGamesPerPage = {videoGamesPerPage}    /* cantidad card x pagina */
                         videoGamesLength  = {allVideoGames.length}  /* total VideoGames por pagina  */
                         paginado          = {paginado}/>

            {/* El  S e a c h B a r */}
            <SearchBar/>
            </div>
                 {/* Tomar solo aquellas cartas que me devuelve el paginado  */}
                 {/* <div className={styles.Card}> */}
                  <ul className={stylesGrid.Grid}> {/*elemento padre */}
                     {   
                         currentVideoGames?.map((ele) =>  (
                         <Card key={ele.id}
                          id     = {ele.id}     // id   
                          name   = {ele.name}   // name
                          image  = {ele.image}  // imagen
                          genres = {ele.genres} // genres arreglo
                         /> 
                       ))
                       } 
                   </ul>
            </div>
    )
}
