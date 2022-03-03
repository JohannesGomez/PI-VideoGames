import React from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdVideoGame } from '../actions'
import { useEffect } from "react";
import Styles from './styles/Detail.module.css';

/* Componente funcional Para mostrar el Detall del Video Juego por ID */
export default function VideoGameDetail(){
    let videoGamesDetailSL = useSelector((state)=> state.videoGamesDetailSG) // detalle VideoGame por id del estado global
    const {idVideogame}= useParams();
    console.log('useParams() ',useParams())
    console.log('VideoGameDetail ',videoGamesDetailSL)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getIdVideoGame(idVideogame))
    },[])

    return(
            <div >
                  <div >
                     <div className={Styles.cardDetail}>
                        <h3>{`Id : ${videoGamesDetailSL.id} Name : ${videoGamesDetailSL.name}`}</h3>
                        <img className={Styles.imgdetailstyle} src={videoGamesDetailSL.image} alt={'img not found'} />
                        <h5>Descriptión : {videoGamesDetailSL.description}</h5>
                        <h5>Released    : {videoGamesDetailSL.released}</h5>
                        <h5>Rating      : {videoGamesDetailSL.rating}</h5>   
                        {<h5>Platforms  : {videoGamesDetailSL.map(ele => ele.platforms.join(', '))}</h5>}
                        {<h5>Genres     : {videoGamesDetailSL.map(ele => ele.genres.join(', '))}</h5>}
                        <br/>
                        <br/>
                       <Link to= '/'><button className={Styles.buttonreturn}>Return</button></Link>
                    </div>
                  </div> 
            </div>
        )
}