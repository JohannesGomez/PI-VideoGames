import React from "react";
import {Link} from 'react-router-dom';
import styles from './styles/LandingPage.module.css';

export default function LandingPage() {
    return(
      <div className={styles.wallpaper}>
                <h1 className={styles.title}>Welcome Video Games App.</h1>
            <div>
                <Link to='/home'><button className={styles.landingbutton}>Start Playing</button></Link>
            </div>    
    </div>
)
    
}