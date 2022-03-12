import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdVideoGame, getInitDetailVG } from '../actions'
import { useEffect } from "react";
import { Spinner } from "./Spinner";
//import Styles from './styles/Detail.module.css';
import styles from './styles/VGDetails.module.css'

/* Componente funcional Para mostrar el Detall del Video Juego por ID */
export default function VideoGameDetail(){
    let videoGamesDetailSL = useSelector((state)=> state.videoGamesDetailSG) // detalle VideoGame por id del estado global
    const [isLoading, setIsLoading] = useState(true);
    const {idVideogame} = useParams();
   // console.log('useParams() ',useParams())
   // console.log('VideoGameDetail ',videoGamesDetailSL)
    const dispatch = useDispatch()
    useEffect(()=>{
        setIsLoading(true)
        dispatch(getIdVideoGame(idVideogame))
        dispatch(getInitDetailVG())
        setIsLoading(false)
    },[])

    if(isLoading) {
      return <Spinner />
    }
    //console.log(videoGamesDetailSL.id)
    if(typeof(videoGamesDetailSL.id) === 'undefined')  return null;
    
    //console.log('componente funcional estado global videoGamesDetailSL ', videoGamesDetailSL.genres)
  

    // para establecer contenido HTML directamente desde React, debes usar el atributo 
    // dangerouslySetInnerHTML y pasarle un objeto con una propiedad __html,

    return(
            <div className={styles.detailsConteiner}>
                 <img className={`${styles.col} ${styles.movieImage}`} src={videoGamesDetailSL.image}  alt={'img not found'}/>
                 <div className={`${styles.col} ${styles.movieDetails}`}>
                     <p>{`Id   : ${videoGamesDetailSL.id}`}</p>
                     <p>{`Name : ${videoGamesDetailSL.name}`}</p>
                     <p>Description :</p>
                     <p className={styles.firstItem} dangerouslySetInnerHTML={{__html: videoGamesDetailSL.description, }} />
                     <p>{`Released    : ${formatDate(videoGamesDetailSL.released)}`}</p>
                     <p>{`Rating      : ${videoGamesDetailSL.rating}`}</p>
                     <p>{`Platforms  :  ${videoGamesDetailSL.platforms.map((ele) => ele).join(', ')}`}</p>
                     <p>{`Genres     :  ${videoGamesDetailSL.genres.map((ele) => ele).join(', ')}`}</p>
                     <Link to= '/home'><button className={styles.buttonReturn}>Return</button></Link>                      
                </div>
            </div> 
  )
}

// var date = new Date("2013-02-20");
function formatDate(date1){
  var date = new Date(date1);
  let formatted_date = (date.getDate()+1) + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  console.log(formatted_date)
return formatted_date;
}
