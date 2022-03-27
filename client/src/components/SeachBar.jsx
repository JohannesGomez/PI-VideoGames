import React from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGame, getVideoGameSearch }         from '../actions';
import styles  from './styles/SearchBar.module.css'
import {FaSearch} from 'react-icons/fa';

export default function SearchBar(){
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
//    const videoGameSL = useSelector((state) => state.videoGamesSG);
    const messageSL = useSelector((state) => state.messageSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const videoGamesSL = useSelector((state) => state.videoGamesSG); // Traer toda la data de paises de mi estado global / mapStateToProps

    const [name, setName] = useState('')
    
//    let msgSG  = useSelector((state) => state.message); // Traer toda la data de paises de mi estado global / mapStateToProps
    
    // logica del renderizad fromo
    // guardar en mi estado local lo que vaya apareciendo en el input
    // 
    function handleInputNameChange(e) {
        e.preventDefault() // evitar que se actualice la pagina
        setName(e.target.value) //tomar el value del input        
    }

  
    function handleSubmit(e) {
        e.preventDefault()
        if(name) { // si incluyo el name buscar los video juego
           setIsLoading(true)
           //console.log('estoy en search1...', videoGameSL)
           dispatch(getVideoGame(name))  // name es el estado local
        //    if(messageSL.length>0) {
        //      dispatch(getVideoGame(''));
        //      console.log('estoy en search...',messageSL.length, videoGamesSL)
        //    }
           setIsLoading(false)
           //console.log('paso por name ', erroresSL) 
           setName('')  // setaer mi estado local
        }else return alert('Name can not be Empty!')

    }
    
    return (
        <form className={styles.searchConteiner}>
            <div className={styles.searchBox}>
                <input  className={styles.searchInput} 
                        type='text'  
                        placeholder='Search Video Games...'
                        value= {name} 
                        onChange={(e)=> handleInputNameChange(e)}/>
                <button className={styles.searchButton}
                        type='submit' 
                        onClick = {(e)=> handleSubmit(e)}>
                        <FaSearch size={20} />
                        
                </button>
            </div>
        </form>
    )
}