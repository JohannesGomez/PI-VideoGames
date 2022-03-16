import React from "react"
import styles from './styles/Paginado.module.css';
import stylesHome from './styles/Home.module.css';

// este omponente es el que renderiza los nuemero
export default function Paginado({videoGamesPerPage, videoGamesLength, paginado}) {
      //console.log('estoy en paginado', videoGamesPerPage, videoGamesLength, paginado)
      const pageNumbers = [];
      for(let i=1; i<=Math.ceil(videoGamesLength/videoGamesPerPage);i++) {
          pageNumbers.push(i)
      }

      return (
      <nav>
      <ul className={stylesHome.pages}>
           { pageNumbers && pageNumbers.map(ele => {
               return(
                    <li className={stylesHome.pages} key={ele}>
                        <button className={stylesHome.bottonPaginado} onClick={() => paginado(ele)}>{ele}</button> {/* paginado constante declarada en el componente home */}
                    </li>
                    )
               })
           }
      </ul>
 </nav>

    )
}