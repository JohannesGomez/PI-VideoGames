import React from "react";
import { Link } from "react-router-dom";
import styles  from './styles/VGCard.module.css';
import placeholder from '../images/placeholder.png'

// __Ruta principal__: debe contener
// - [ ] Input de búsqueda para encontrar videojuegos por nombre
// - [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Géneros
export default function videoGameCard({idVideogame, name, image, rating, genres}) {
    //console.log('estoy en card ',idVideogame)
    return( //width = {320} height = {213}
        <li className = {styles.movieCard}>
            <img className={styles.movieImage} width = {265} height = {198} src = {image?image:placeholder} alt = {name} />  
            <div className = {styles.movieItemName}> {name}</div>
            <div className = {styles.movieItemGenre}> {genres.map(ele => ele+', ')} </div>
            <div className = {styles.movieItemRatin}> {rating}</div>
            <div>
            <Link to= {`/videogame/${idVideogame}`}><button className = {styles.movieBottonDetail}>Detail</button></Link>
            </div>
       </li>
    );
}



