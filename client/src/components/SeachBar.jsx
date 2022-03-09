import React from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGame, getVideoGameSearch }         from '../actions';

export default function SearchBar(){
    
    const dispatch = useDispatch()
  //  const erroresSL = useSelector((state) => state.errorSG); // Traer toda la data de paises de mi estado global / mapStateToProps
    const [name, setName] = useState('')
    
//    let msgSG  = useSelector((state) => state.message); // Traer toda la data de paises de mi estado global / mapStateToProps
    
    // logica del renderizado
    // guardar en mi estado local lo que vaya apareciendo en el input
    // 
    function handleInputNameChange(e) {
        e.preventDefault()
        setName(e.target.value) //tomar el value del input        
        
    }

   
    function handleSubmit(e) {
        e.preventDefault()
        if(name) { // si incluyo el name buscar los video juego
           dispatch(getVideoGame(name))  // name es el estado local
           //console.log('paso por name ', erroresSL) 
           setName('')  // setaer mi estado local
        }else{ return alert('Name cant not Empty!', name)}

    }
    
    return (
        <div>
            <input id="search" type='text'  placeholder='Search...'  value= {name} 
            onChange={(e)=> handleInputNameChange(e)}/>
            <button type='submit' onClick = {(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}