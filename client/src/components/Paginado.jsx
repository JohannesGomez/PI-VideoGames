import React from "react"
//import {styles} from './Styles.module.css';
import stylesHome   from './styles/Home.module.css';

// este omponente es el que renderiza los nuemero
export default function Paginado({videoGamesPerPage, videoGamesLength, paginado}) {
      // cardsPerPage determina la cantidad de card por pantalla
      console.log('estoy en paginado', videoGamesPerPage, videoGamesLength, paginado)
      const pageNumbers = [];
      for(let i=1; i<=Math.ceil(videoGamesLength/videoGamesPerPage);i++) {
          pageNumbers.push(i)
      }
     // renderiza los numeros
     return (
       <nav>
           <ul className={stylesHome.pages}>
                { pageNumbers &&  
                  pageNumbers.map(ele => {
                    return(
                         <li className={stylesHome.pages} key={ele}>
                             <button onClick={() => paginado(ele)}>{ele}</button> {/* paginado constante declarada en el componente home */}
                         </li>
                         )
                    })
                }
           </ul>
      </nav>
    )
}