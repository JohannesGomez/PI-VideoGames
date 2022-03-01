//import React, { useState } from "react";
//import { useEffect } from "react"; // Hooks
import { useState, useEffect } from "react"; // Hooks
import {useDispatch, useSelector} from 'react-redux';
import { getAllVideoGames, getAllGenres,filters,orders,getNameVideoGame } from "../actions"; // importar la accion
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
    const allVideoGames = useSelector((state) => state.videoGamesSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const allGenres     = useSelector((state) => state.genresSG); // Traer toda la data de actividades mi estado global / mapStateToProps

    // Ordenamiento
     const [sorts, setSorts] = useState('') // se crea un estado local para el ordenamiento name country

    //console.log(allGenres) 

    /*------------------------------------------------------------
       P A G I N E O 
    */
      // Para el paginado hay que crear varios estado globales
      // currentPage(mi estado actual) ,setCurrentPage(setea mi estado)
      const [currentPage,  setCurrentPage]  = useState(1)  // si es estado local 1 debido a que arranca en la primera pagina
      const [VideoGamesPerPage, setVideoGamesPerpage] = useState(15) // estado que determina cuantos cartas por pagina será un arreglo de 6 posiciones
 
      const indexOfLastCard   = currentPage*VideoGamesPerPage       // 6 // por la cantidad de personajes por pagina. 
      const indexOfFirstCard  = indexOfLastCard-VideoGamesPerPage   //0 // indice del primer elemento
      const currentVideoGames = allVideoGames.slice(indexOfFirstCard,indexOfLastCard)

       console.log(currentVideoGames) 

      // va a tomar el indice de la primera posicion o y el indice de la ultima posicion
      // devuel un arreglo desde indice 0 hasta el indice 9 por ser diez cartas
      /*
      El método slice() se utiliza para cortar o dividir un array en trozos más pequeños. 
      Esta función toma dos parámetros como entrada, start y end. El start representa el 
      índice inicial desde donde desea comenzar a cortar el array, y el end representa en 
      qué índice desea dejar de cortar o dividir.
      */
         
    //  console.log('pagina actual : ',currentPage)
    //  console.log('cartas x pagina', VideoGamesPerPage)
    //  console.log('indice ultimo personaje',indexOfLastCard)
    //  console.log('indice primer personaje',indexOfFirstCard)     
    //  console.log('array VideoGames x pagina actual',currentVideoGames)

      //console.log(allVideoGames)
      // 1------0------6
      // 2------7------13

      // renderizar cartas setea el numero de pagina
      const paginado = (pageNumber) => {
            setVideoGamesPerpage(pageNumber)
      }

     console.log('estoy en home') 
    // Traer del estado global mis paises cuando el componente de monta
    useEffect (()=> {
        dispatch(getNameVideoGame('')); // ejecutar la accion de forma invocada  // mapDispatchToProps
        dispatch(getAllGenres());     // ejecutar la accion de forma invocada      // mapDispatchToProps
        // console.log('estoy en home allVideoGames', allVideoGames)
        // console.log('estoy en home allGenres', allGenres)

    },[]);   // se incluye en el arreglo lo que depende de componente didmount
            // te montas siempre cuando suceda esto
    
    // realizar el handler del filter por continente
    function handleFilters(e) {  // se le pasa el evento a la action
        e.preventDefault();
        dispatch(filters(e.target.value))
    }
    
    // ordenamiento por alfabeticamente name country
    function handleSorts(e){
        e.preventDefault();
        dispatch(orders(e.target.value))
        setCurrentPage(1); // se setea por defecto el estado local en 1 y para que pude renderizar se renderice
        setSorts(`Ordenado${e.target.value}`)
        // y seteo el setsortnamecountry estado local para que pueda renderizar
        //console.log(e.target.value)
    }    


    return (
      <div>
           {/* Menu de Navegacion*/}
            <nav className={stylesHome.navbar}>
                 <div className={stylesHome.create}>
                     <Link to='/CreateVideoGame'><button className={stylesFilter.createButton}>Create Video Games</button></Link>
                </div>
                
               <div className={stylesFilter.filters}>
                    {/* Filtrar videos games por Generos y Creado en al app*/}
                    <div className={stylesFilter.alphabethic}>
                        <div>Filters Video Games By :</div>
                        {/* e.target.value / del valor del onchage() el valor del select va llegar a la accion por payload
                            simpre colocar en el Calue lo que tengo en el back 
                             y se acede a los valores con el e.target.value*/}
                        <select className={stylesFilter.alphabethic} onChange={e =>handleFilters(e)}> 
                            <option value='sele'>Select</option> 
                            <option value='filtGenr'>Genres</option>    
                            <option value='────────'></option>
                            <option value='filtCrea'>Create app</option>
                        </select>
                    </div>
                    {/* Ordenamientos Alfabetico Ascendente, Descente Alfabeticamente*/}
                    <div className={stylesFilter.alphabethic}>
                        <div>Alphabetical Sort By :</div>
                        <select className={stylesFilter.alphabethic} onChange={e=>handleSorts(e)}>
                            <option value='sortsele'>Select</option>
                            <option value=''>Name</option>
                            <option value='sortAsceName'>A - Z </option> {/*ascendiente Name*/}
                            <option value='sortDescName'>Z - A</option>  {/*descendinte  Name*/}
                            <option value='────────'></option>
                            <option value=''>Rating</option>
                            <option value='sortAsceRati'>A - Z </option> {/*ascendiente Rating*/}
                            <option value='sortDescRati'>Z - A</option>  {/*descendinte Rating*/}
                        </select>
                    </div>
               </div>
           </nav>
                
          {/* Renderizar el componente de Paginado y le paso el estado de mi pagona
                  VideoGamesPerPage =  pasa el estado declarado arriba de cartas por pagina
                  allVideoGames =  pasa el valor numerico de toda mi informacion del arreglo 
                  paginado     =  pasa mi constante paginado
           */}
            <div className={stylesHome.pages}>
               <Paginado VideoGamesPerPage = {VideoGamesPerPage}   /* cantidad card x pagina */
                         allVideoGames     = {allVideoGames.length} /* total VideoGames por pagina  */
                         paginado          = {paginado}/>

            {/* El  S e a c h B a r */}
            <SearchBar/>
            </div>
                 {/* Tomar solo aquellas cartas que me devuelve el paginado  */}
                 {/* <div className={styles.Card}> */}
                  <ul className={stylesGrid.countrysGrid}> {/*elemento padre */}
                     {   
                         currentVideoGames?.map((ele) =>  (
                         <Card key={ele.id}
                          id     = {ele.id} 
                          name   = {ele.name} 
                          image  = {ele.image} 
                         /> 
                       ))
                       } 
                   </ul>
            </div>
    )
}
