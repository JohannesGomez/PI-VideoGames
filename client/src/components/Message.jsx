import Styles from './styles/Message.module.css';
import style from './styles/VGDetails.module.css';
import {Link} from "react-router-dom";
import React, { useEffect } from "react"
import {useDispatch} from 'react-redux';
import {IniMessage} from '../actions'
//import {paginado} from './Home'
import styles  from './styles/Message.module.css'

// function retornar() {
//     document.getElementById('idDelDiv').style.display = 'none';
// }

export default function Message({message}) {
    const dispatchMess = useDispatch(); // declara la constante dispacth y asi despachar las acciones
    console.log('estoy mostrando un mensaje...!!!!', message)

    function handleSubmit(e) {
        e.preventDefault()
    //    dispatchMess(IniMessage());

    }    

    return (

        <form className={styles.fondoform}>
        <div className={styles.divform}>{message}
            <button 
                    type='submit' 
                    onClick = {(e)=> handleSubmit(e)}>
            </button>
        </div>
    </form>
        

    )

}
