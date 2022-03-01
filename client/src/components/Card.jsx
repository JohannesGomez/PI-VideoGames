import React from "react";
import { Link } from "react-router-dom";
import styles  from './styles/Card.module.css';

export default function Card({id,name,image,genres}) {
    //console.log('estoy en card ',genres)
    return(
        <li className = {styles.Card}>
          <img width  = {320}   height = {213} className = {styles.Image} src = {image} alt = {name} />  
          <div>{name}</div>
          <div>
            <h5>Genres :</h5>
            {
             genres?.map(ele => {
               return (
               <h5>{ele.name}</h5>
               )})
            }
          </div>
       </li>
    );
}



