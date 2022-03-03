import { useState, useEffect } from "react"; // Hooks
import {useDispatch, useSelector} from 'react-redux';
import { getVideoGame, getAllGenres,filterGenres,
         filterDbOrCrea, sortBy } from "../actions"; // importar la accion
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
    const VideoGamesAll = useSelector((state) => state.videoGamesAllSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const genresAll = useSelector((state) => state.genresSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    console.log('HOME TODOS VJ',VideoGamesAll)

    // Ordenamiento
    const [filters, setFilters] = useState('') // se crea un estado local para el ordenamiento name country
    const [sorts, setSorts] = useState('') // se crea un estado local para el ordenamiento name country

      //   P A G I N E O 
      // Para el paginado hay que crear varios estado globales
      // currentPage(mi estado actual) ,setCurrentPage(setea mi estado)
      const [currentPage,  setCurrentPage]  = useState(1)  // si es estado local 1 debido a que arranca en la primera pagina
      const [videoGamesPerPage, setVideoGamesPerpage] = useState(15) // estado que determina cuantos cartas por pagina será un arreglo de 6 posiciones
 
      const indexOfLastCard   = currentPage * videoGamesPerPage       // 6 // por la cantidad de personajes por pagina. 
      const indexOfFirstCard  = indexOfLastCard - videoGamesPerPage   //0 // indice del primer elemento
      const VideoGamesCurrent = VideoGamesAll.slice(indexOfFirstCard,indexOfLastCard)     

      const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
     }               

     // Traer del estado global mis paises cuando el componente de monta
    useEffect (()=> {
      console.log('cambio mi estado GENEROS')
      dispatch(getAllGenres());
    },[]);   //

  // Traer del estado global mis paises cuando el componente de monta
    useEffect (()=> {
        dispatch(getVideoGame('')); // ejecutar la accion de forma invocada  // mapDispatchToProps
    },[]);   // se incluye en el arreglo lo que depende de componente didmount
            // te montas siempre cuando suceda esto
   
  // filtrado por generos
  function handleFilterGenres(e) {
     console.log(e.target.value)
     dispatch(filterGenres(e.target.value))
  }

  // Filtrado por videos existente o agregado por nosotros
  function handleFilterDbOrCrea(e) {
    dispatch(filterDbOrCrea(e.target.value))
  }
 // ordenamiento por alfabeticamente ascen y descen por orden alfabetico y por rating
  function handleSortBy(e){
     e.preventDefault();
    dispatch(sortBy(e.target.value))
    setCurrentPage(1); // se setea por defecto el estado local en 1 y para que pude renderizar se renderice
    setSorts(`Ordenado By ${e.target.value}`)
    // y seteo el setsorts estado local para que pueda renderizar
  }    

    return (
        <div>
           {/* Menu de Navegacion*/}
            <nav className={stylesHome.navbar}>
                 <div className={stylesHome.create}>
                     <Link to='/CreateVideoGame'><button className={stylesFilter.createButton}>Create Video Games</button></Link>
                </div>
                
            </nav>
            {/* Procesos de Filtrados por Generos y Video Juegos Creados en la app*/}
            <div className={stylesFilter.filters}>
                    {/* Filtrar videos games por Generos*/}
                    <div className={stylesFilter.alphabethic}>
                        <div>Filters by Genres</div>
                        {/* e.target.value / del valor del onchage() el valor del select va llegar a la accion por payload
                            simpre colocar en el Calue lo que tengo en el back 
                             y se acede a los valores con el e.target.value*/}
                            <select className={stylesFilter.alphabethic} onChange={e =>handleFilterGenres(e)}> 
                                 <option value='sele'>Select</option> 
                               {
                                  genresAll?.map(ele=>{return(
                                   <option key={ele.id} value={ele.name} >{ele.name}</option>
                                 )})
                               } 

                            </select>
                    </div>
                    {/* Filtrar videos games existentes o Creados en al app*/}
                    <div className={stylesFilter.alphabethic}>
                        <div>Filters by DataBase </div>
                        {/* e.target.value / del valor del onchage() el valor del select va llegar a la accion por payload
                            simpre colocar en el Calue lo que tengo en el back 
                             y se acede a los valores con el e.target.value*/}
                        <select className={stylesFilter.alphabethic} onChange={e=>handleFilterDbOrCrea(e)}>
                            <option value='sele'>Select</option>
                            <option value='filtCrea'>Created</option>  {/*descendinte  Name*/}
                            <option value='filtExis'>All</option>      {/*ascendiente Name*/}
                        </select>

                    </div>

                    {/* Ordenamientos Alfabetico Ascendente, Descente Alfabeticamente*/}
                    <div className={stylesFilter.alphabethic}>
                        <div>Sort By :</div>
                        <select className={stylesFilter.alphabethic} onChange={e=>handleSortBy(e)}>
                            <option value = 'sele'>Select</option>
                            <option value = '' disabled = 'disabled'>Alphabetical Name</option>
                            <option value = 'sortAscName'>A - Z </option> {/*ascendiente Name*/}
                            <option value = 'sortDesName'>Z - A</option>  {/*descendinte  Name*/}
                            <option value = '' disabled = 'disabled'>─────────────────</option>
                            <option value = '' disabled = 'disabled'>Rating Video Game</option>
                            <option value = 'sortAscRati'>A - Z </option> {/*ascendiente Rating*/}
                            <option value = 'sortDesRati'>Z - A</option>  {/*descendinte Rating*/}
                        </select>
                    </div>
               </div>
               {/* fin del proceso de filtro y ordenamiento */}

            {/* Renderizar el componente de Paginado y le paso el estado de mi pagona
                  VideoGamesPerPage =  pasa el estado declarado arriba de cartas por pagina
                  VideoGamesAll =  pasa el valor numerico de toda mi informacion del arreglo 
                  paginado     =  pasa mi constante paginado
            */}
            <div className={stylesHome.pages}>
               <Paginado 
                         videoGamesPerPage = {videoGamesPerPage}    /* cantidad card x pagina */
                         videoGamesLength  = {VideoGamesAll.length}  /* total VideoGames por pagina  */
                         paginado          = {paginado}/>

            {/* El  S e a c h B a r */}
            <SearchBar/>
            
            </div>
                 {/* Tomar solo aquellas cartas que me devuelve el paginado  */}
                 {/* <div className={styles.Card}> */}
                  <ul className={stylesGrid.Grid}> {/*elemento padre */}
                     {   
                         VideoGamesCurrent?.map((ele) =>  (
                         <Card key={ele.id}
                          idVideogame = {ele.id}     // id   
                          name        = {ele.name}   // name
                          rating      = {ele.rating} // rating o clasificacion
                          image       = {ele.image}  // imagen
                          genres      = {ele.genres} // genres arreglo de generos
                         /> 
                       ))
                       } 
                   </ul>
            </div>
    )
}
