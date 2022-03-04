import React from "react";
import { Link } from "react-router-dom";
import styles  from './styles/Card.module.css';

// __Ruta principal__: debe contener
// - [ ] Input de búsqueda para encontrar videojuegos por nombre
// - [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Géneros
export default function videoGameCard({idVideogame, name, image, rating, genres}) {
    //console.log('estoy en card ',idVideogame)
    return( //width = {320} height = {213}
        <li className = {styles.Cards}>
          <img width = {320} height = {213} className = {styles.ImageCard} src = {image} alt = {name} />  
            <div className = {styles.Card}> 
            {/* <h5  className = {styles.NameCard}>   {idVideogame}   </h5> */}
            <h2  className = {styles.NameCard}>  {name} </h2>
            <h2  className = {styles.NameCard}>  {genres.map(ele => ele+' ')} </h2>
            <h5  className = {styles.RatingCard}>{rating}</h5>
            </div>
            <Link to= {`/videogame/${idVideogame}`}><button >Detail</button></Link>
       </li>
    );
}



