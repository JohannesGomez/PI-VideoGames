import React from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGame, getVideoGameSearch }         from '../actions';
import styles  from './styles/SearchBar.module.css'
import {FaSearch} from 'react-icons/fa';

export default function SearchBar(){
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
  //  const erroresSL = useSelector((state) => state.errorSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const [name, setName] = useState('')
    
//    let msgSG  = useSelector((state) => state.message); // Traer toda la data de paises de mi estado global / mapStateToProps
    
    // logica del renderizad fromo
    // guardar en mi estado local lo que vaya apareciendo en el input
    // 
    function handleInputNameChange(e) {
        e.preventDefault()
        setName(e.target.value) //tomar el value del input        
    }

  
    function handleSubmit(e) {
        e.preventDefault()
        if(name) { // si incluyo el name buscar los video juego
           setIsLoading(true)
           dispatch(getVideoGame(name))  // name es el estado local
           setIsLoading(false)
           //console.log('paso por name ', erroresSL) 
           setName('')  // setaer mi estado local
        }else{ return alert('Name cant not Empty!', name)}

    }
    
    return (
        <form className={styles.searchConteiner}>
            <div className={styles.searchBox}>
                <input  className={styles.searchInput} 
                        type='text'  placeholder='Search...'
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