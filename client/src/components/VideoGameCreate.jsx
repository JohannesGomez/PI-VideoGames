import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllGenres, getAllPlatforms, postVideoGame} from '../actions';
import Styles from './styles/Form.module.css';


function validate(inputVideoGame) {  // funcion validadora todos los errores de los inputs tiene que retornar un objeto
    let errors = {}; // genera un objeto de estado de errores
    //console.log(inputVideoGame)
    if(!/[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputVideoGame.name)) { // Solo letra manuyuscula y minusculas
      errors.name = '* Name is Require !' // guardar en mi objeto erros se requiere un nombre
    } else errors.name = ' ' 
    // validar description
    if(!/[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inputVideoGame.description)) { // Solo letra manuyuscula y minusculas
      errors.description = '* Description is Requiere !'
    }else errors.description = ' ' 
    // validar rating
    if(!/[12345]+$/.test(inputVideoGame.rating)) {
      errors.rating = 'Rating is Requiere, Number Betwen 0 and 5 !'
    }else errors.rating = ' ' 
    // // validar Plataformas
    // if(inputVideoGame.platforms.length===0) {
    //   errors.platforms = '* Plataform is Requiere !'
    // }else errors.platforms = [] 
    // // validar Plataformas
    // if(inputVideoGame.genresId.length===0) {
    //   errors.genresId = '* Genres is Requiere !'
    // }else errors.genresId = []
    return errors;
}

export default function VideoGameCreate(){
    const dispatch = useDispatch(); // declara la constante dispacth y asi despachar las acciones
    const genresAll  = useSelector((state) => state.genresSG); // Traer 
    const platformsAll  = useSelector((state) => state.platformsSG); // 
    //console.log('estoy VideoGameCreate estado global GenresSG', genresAll)
    //console.log(platformsAll)
    
    const [errors, setErrors] = useState({
      name:'',
      description:'',
      released:'',
      rating:'',
      image:'',
      // platforms:[],
      // genresId:[],
  }) 

    const [inputVideoGame, setInputVideoGame] = useState({
        name:'',
        description:'',
        released:'',
        rating:'',
        image:'',
        platforms:[],
        genresId:[],
    })

    useEffect(() => { // ciclo de vida del componente
      dispatch(getAllPlatforms()); // 
   },[])

   useEffect(() => { // ciclo de vida del componente
    dispatch(getAllGenres());    // 
 },[])

    function handleChange(e){
      //console.log(e.target.name)
      setInputVideoGame({...inputVideoGame, [e.target.name] : e.target.value}) // se maneja mejor los estados
      setErrors(validate({...inputVideoGame, [e.target.name] : e.target.value}))
    }

  // Check de Plataformas 
  function handleCheckPlatforms(e){
    if(e.target.checked){        
        console.log('check plataformas TRUE ',e.target.checked) 
        setInputVideoGame({...inputVideoGame, platforms : [...inputVideoGame.platforms, e.target.value]})
        //console.log(inputVideoGame.platforms)
    } else { 
      console.log('check plataformas FALSE ',e.target.checked)
      // setear los checks
        setInputVideoGame({ ...inputVideoGame, 
        platforms : inputVideoGame.platforms.filter(ele => ele !== e.target.value)}) // remplazar en i array todos aquellos check que sean dife de false
        //console.log(inputVideoGame)
    }
   // setErrors(validate({...inputVideoGame, [e.target.name] : e.target.value}))


  }   

  // Check de Generos
  function handleCheckGenres(e){
    //console.log('check generos ',e.target.checked)
    if(e.target.checked){
        setInputVideoGame({ ...inputVideoGame, genresId : [...inputVideoGame.genresId, e.target.value]})
     } else { 
        // setear los checks
        setInputVideoGame({ ...inputVideoGame, 
        genresId: inputVideoGame.genresId.filter(ele => ele !== e.target.value)}) // remplazar en i array todos aquellos check que sean dife de false
    }
    //setErrors(validate({...inputVideoGame, [e.target.name] : e.target.value}))

  }

  
  function handleSubmit(e) { // e= OnChange = indica que input lo invoco y valores del input
    e.preventDefault()
    if(inputVideoGame.name   && inputVideoGame.description         && inputVideoGame.released && 
       inputVideoGame.rating && inputVideoGame.platforms.length>0  && inputVideoGame.genresId.length>0) {
       dispatch(postVideoGame(inputVideoGame))  // funcion autoinvocada para agregar VideoGame
       setInputVideoGame({name:'',description:'',released:'',rating:'',image:'',platforms:[],genresId:[]})        
       document.getElementById('formControlado').reset()
       alert('Info Agree!')
      }else {
        alert('Fields *, Some Require!')}
  }

return(
        <div  className={Styles.fondoform}>
              <div className={Styles.divform}>
                  <h1 className={Styles.h1}>Created Videos Games</h1>

                  {/*Formulario __controlado con JavaScript__ */}
                  <form id='formControlado' className={Styles.form} onSubmit={e => handleSubmit(e)}>
                    <div className={Styles.div}>
                         <label className={Styles.h2} >*Name : </label>
                         < input className={Styles.inputAct}
                           type     = 'text' 
                           value    = {inputVideoGame.name}
                           name     = 'name'
                           onChange = {(e)=>handleChange(e)}
                         />
                         {errors.name && (<p className={Styles.p}>{errors.name}</p>)}  
                    </div>
                    <div className={Styles.div}>
                         <label className={Styles.h2}>*Description : </label>
                         < input className={Styles.inputAct}
                           type     = 'text' 
                           value    = {inputVideoGame.description}
                           name     = 'description'
                           onChange = {(e)=>handleChange(e)}
                         />
                         {errors.description && (<p className={Styles.p}>{errors.description}</p>)}
                    </div>
                    <div className={Styles.div}>
                         <label className={Styles.h2}>*Date Released : </label>
                         < input className={Styles.inputAct}
                           type     = 'date' 
                           value    = {inputVideoGame.released}
                           name     = 'released'
                           onChange = {(e)=>handleChange(e)}
                         />
                         {errors.released && (<p className={Styles.p}>{errors.released}</p>)} 
                    </div>
                    <div className={Styles.div}>
                         <label className={Styles.h2}>*Rating : </label>
                         < input className={Styles.inputAct}
                           type     = 'number' 
                           value    = {inputVideoGame.rating}
                           name     = 'rating'
                           onChange = {(e)=>handleChange(e)}
                         />
                         {errors.rating && (<p className={Styles.p}>{errors.rating}</p>)} 
                    </div>
                    <div className={Styles.div}>
                         <label className={Styles.h2}>Image : </label>
                         < input className={Styles.imageForm}
                           type     = 'text' 
                           value    = {inputVideoGame.image} 
                           name     = 'image'
                           onChange = {(e)=>handleChange(e)}
                         />
                         {errors.image && (<p className={Styles.p}>{errors.image}</p>)} 
                    </div>
                    {/* Mostrar Platafomra de la B.D.*/}
                    <div className={Styles.div}>
                        <label className={Styles.h2}>*Platforms :</label>
                        {platformsAll.map((ele) => ( 
                            <label key={ele.id} className=''>
                              <input className=''
                                key     = {ele.id}
                                type    = 'checkbox'
                                name    = 'platforms'
                                value   = {ele.id} 
                                onClick = {(e) => handleCheckPlatforms(e)}
                              />
                              {ele.name}  
                            </label>))
                        } 
                    </div>
                    {/* Mostrar Generos de la B.D.*/}
                    <div className={Styles.div}>
                        <label className={Styles.h2}>*Genres :</label>
                        {genresAll.map((ele) => ( 
                            <label key={ele.id} className=''>
                              <input className='Check'
                                key     = {ele.id}
                                name    = 'genresId'
                                type    = 'checkbox'
                                value   = {ele.id} 
                                onClick = {(e) => handleCheckGenres(e)}
                              />
                              {ele.name}  
                            </label>))} 
                    </div>
                    {/* SubMit enviar el formulario para la accion de grabar */}                    
                   <div className=''> 
                        <button className='' type='submit'>Created</button>
                   </div>
                  </form>
                  <Link to= '/home'><button className={Styles.buttonReturn}>Return</button></Link> 
              </div>
        </div>
    )
}

// _Ruta de creación de videojuegos__: debe contener
// - [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
//   - Nombre
//   - Descripción
//   - Fecha de lanzamiento
//   - Rating
// - [ ] Posibilidad de seleccionar/agregar varios géneros
// - [ ] Posibilidad de seleccionar/agregar varias plataformas
// - [ ] Botón/Opción para crear un nuevo videojuego

