import { useState, useEffect } from "react"; // Hooks
import {useDispatch, useSelector} from 'react-redux';
import { getVideoGame, getAllGenres,filterGenres,IniMessage,
         filterDbOrCrea, sortBy } from "../actions"; // importar la accion
import VideoGameCard from './VideoGameCard';
import Paginado      from './Paginado';
import {Link}        from 'react-router-dom';
import SearchBar     from "./SeachBar";
import stylesHome    from './styles/Home.module.css';
import stylesGrid    from './styles/VGGrid.module.css';
import { Spinner } from "./Spinner";
import  Message  from './Message'

/*
  que tengo que traerme de back primero para hacer toda la logica de la barra de busqueda ?
  traer la ruta de name..la logica en la accion
*/

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch      = useDispatch(); // declara la constante dispacth y asi despachar las acciones
    const videoGamesSL = useSelector((state) => state.videoGamesSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const genresAll = useSelector((state) => state.genresSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const messageSL = useSelector((state) => state.messageSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    
    const [messageCL, setmessageCL] = useState({}) // se crea un estado local para el ordenamiento name country
    
    console.log('mensaje local ',messageCL)
    console.log('HOME TODOS VJ',videoGamesSL)

    // Ordenamiento
    // const [filtersGenres, setFiltersGenres] = useState('') // se crea un estado local para el ordenamiento name country
    // const [filters, setFilters] = useState('') // se crea un estado local para el ordenamiento name country
    const [sorts, setSorts] = useState('') // se crea un estado local para el ordenamiento name country

      //   P A G I N E O 
      // Para el paginado hay que crear varios estado globales
      // currentPage(mi estado actual) ,setCurrentPage(setea mi estado)
      const [currentPage,  setCurrentPage]  = useState(1)  // si es estado local 1 debido a que arranca en la primera pagina
      const [videoGamesPerPage, setVideoGamesPerpage] = useState(15) // estado que determina cuantos cartas por pagina será un arreglo de 6 posiciones
 
      const indexOfLastCard   = currentPage * videoGamesPerPage       // posicion de ultimo elemento a mostrar
      const indexOfFirstCard  = indexOfLastCard - videoGamesPerPage   // posicion de primer elemento a mostrar
      const VideoGamesCurrent = videoGamesSL.slice(indexOfFirstCard,indexOfLastCard) // tomar los primeros 15 elementps

     const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
     }        

    
    useEffect (()=> {
        console.log('estoy en el use Effect...!')
        setIsLoading(true)
        dispatch(getAllGenres());
        dispatch(getVideoGame('')); // ejecutar la accion de forma invocada  // mapDispatchToProps
        setIsLoading(false)
    },[]);   // se incluye en el arreglo lo que depende de componente didmount    // te montas siempre cuando suceda esto
   
  // filtrado por generos
  function handleFilterGenres(e) {
     //console.log(e.target.value)
     if(e.target.value!=='sele'){
       e.preventDefault();
       dispatch(filterGenres(e.target.value))
     }
   }

  // Filtrado por videos existente o agregado por nosotros
  function handleFilterDbOrCrea(e) {
    if(e.target.value!=='sele'){
      e.preventDefault();
      dispatch(filterDbOrCrea(e.target.value))
    }
  }

 // ordenamiento por alfabeticamente ascen y descen por orden alfabetico y por rating
  function handleSortBy(e){
    if(e.target.value!=='sele'){
      e.preventDefault();
      dispatch(sortBy(e.target.value))
      setCurrentPage(1); // se setea por defecto el estado local en 1 y para que pude renderizar se renderice
      setSorts(e.target.value)// y seteo el setsorts estado local para que pueda renderizar
    }    
  }    

  function handleReset(e) {
    e.preventDefault();
    setIsLoading(true)
    dispatch(getVideoGame(''));
    setCurrentPage(1); // se setea por defecto el estado local en 1 y para que pude renderizar se renderice
    setIsLoading(false)
  }

   if(isLoading) {
     //console.log('spiner...')
     return <Spinner />
   }
  
    

  return (

        <div className={stylesHome.fondoHome}>
             
             {
              messageSL.length>0 && 
              <Message  
              message  = {messageSL}
              />
             }

              {/* Titulo Principal*/}
              <Link to = '/'><h1 className={stylesHome.titleHome}>Video Games App</h1></Link> 
              {/* Procesos de Filtrados por Generos y Video Juegos Creados en la app*/}
                {/* Opcion para la creacion de video games*/}
                    <div className={stylesHome.createdContenedor} onClick={e =>handleReset(e)}>
                     <button 
                     className={stylesHome.createdButton}>Reload</button>
                    </div>
                    <div className={stylesHome.createdContenedor}>
                        <Link to='/videoGameCreated'><button 
                        className={stylesHome.createdButton}>Created Video Games</button></Link>
                    </div>
              <div>
                        <label className={stylesHome.subTitulo}>Filters by Genres: </label>
                        {/* e.target.value / del valor del onchage() el valor del select va llegar a la accion por payload
                            simpre colocar en el Calue lo que tengo en el back 
                             y se acede a los valores con el e.target.value*/}
                            <select className={stylesHome.Selector} onChange={e =>handleFilterGenres(e)}> 
                                 <option value='sele'>Select</option> 
                               {
                                  genresAll?.map((ele)=>(
                                   <option key={ele.id} value={ele.name} >{ele.name}</option>
                                 ))
                               } 

                            </select>
                        {/* Filtrar videos games existentes o Creados en al app*/}
                        <label className={stylesHome.subTitulo}>Filters by DataBase :</label>
                        {/* e.target.value / del valor del onchage() el valor del select va llegar a la accion por payload
                            simpre colocar en el Calue lo que tengo en el back 
                             y se acede a los valores con el e.target.value*/}
                        <select className={stylesHome.Selector} onChange={e=>handleFilterDbOrCrea(e)}>
                            <option value='sele'>Select</option>
                            <option value='filtCrea'>Created</option>  {/*descendinte  Name*/}
                            <option value='filtExis'>All</option>      {/*ascendiente Name*/}
                        </select>
                      <br></br>
                      {/* Ordenamientos Alfabetico Ascendente, Descente Alfabeticamente*/}
                      <label className={stylesHome.subTitulo}>Sort By :</label>
                           <select className={stylesHome.Selector} onChange={e=>handleSortBy(e)}>
                            <option value = 'sele'>Select</option>
                            <option value = '' disabled = 'disabled'>Alphabetical Name :</option>
                            <option value = 'sortAscName'>A - Z </option> {/*ascendiente Name*/}
                            <option value = 'sortDesName'>Z - A</option>  {/*descendinte  Name*/}
                            <option value = '' disabled = 'disabled'>─────────────────</option>
                            <option value = '' disabled = 'disabled'>Rating Video Game</option>
                            <option value = 'sortAscRati'>A - Z </option> {/*ascendiente Rating*/}
                            <option value = 'sortDesRati'>Z - A</option>  {/*descendinte Rating*/}
                        </select>
               {/* fin del proceso de filtro y ordenamiento */}

                  {/* El  S e a c h B a r */}
                  <SearchBar/>
                  {/* Renderizar el componente de Paginado y le paso el estado de mi pagona
                        VideoGamesPerPage =  pasa el estado declarado arriba de cartas por pagina
                        videoGamesSL =  pasa el valor numerico de toda mi informacion del arreglo 
                        paginado     =  pasa mi constante paginado
                  */}

                  <div className={stylesHome.pages}>

                    <Paginado 
                              videoGamesPerPage = {videoGamesPerPage}    /* cantidad card x pagina */
                              videoGamesLength  = {videoGamesSL.length}  /* total VideoGames por pagina  */
                              paginado          = {paginado}/>
                  </div>
            
                 {/* Tomar solo aquellas cartas que me devuelve el paginado  */}
                 {/* <div className={styles.Card}> */}
                     <ul className={stylesGrid.moviesGrid}> {/*elemento padre */}
                     { VideoGamesCurrent?.map((ele) =>  (
                         <VideoGameCard key={ele.id}
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
       </div>
    )
}
