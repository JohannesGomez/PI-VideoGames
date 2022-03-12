import styles1 from './styles/Mensaje.module.css'
import styles2 from './styles/VGDetails.module.css'
import {Link}        from 'react-router-dom';

export function Mensaje() {
    return (
        <div className={styles1.empty}>Video Games Not Found!
             <Link to= '/home'><button className={styles2.buttonReturn}>Return</button></Link> 
        </div>
    )
}
