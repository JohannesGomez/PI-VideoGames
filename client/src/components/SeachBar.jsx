import React from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGame }         from '../actions';

export default function SearchBar(){
    
    const dispatch = useDispatch()
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
           console.log('paso por name ', name) 
           dispatch(getVideoGame(name))  // name es el estado local
           setName('')  // setaer mi estado local
           //document.getElementById("search").value='' //?????
        }else{ return alert('Name not cant not Empty!')}

    }
    
    return (
        <div>
            <input id="search" type='text'  placeholder='Search...'  value= {name} 
            onChange={(e)=> handleInputNameChange(e)}/>
            <button type='submit' onClick = {(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}