import React       from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import './App.css';
// import NavBar from './components/NavBar';
// import VgDetail from './components/VgDetail';
// import VgCreate from './components/vgCreate';
import VideoGameCreate from './components/VideoGameCreate';
import VideoGameDetail from './components/VideoGameDetail';
import styles from './App.module.css'

// crear mis rutas
function App() {
  return (
    <React.Fragment>
      <div>
          <header><h1 className={styles.title}>Video Games App</h1> </header>
      </div>
      {/* <NavBar /> */}
      <Route exact path  = '/'                       component = {LandingPage}/> 
      <Route exact path  = '/home'                   component = {Home}/>
      <Route exact path  = '/videogame/:idVideogame' component = {VideoGameDetail}/>
      <Route exact path  = '/videoGameCreated'       component = {VideoGameCreate}/> 
      </React.Fragment>
  );
}

export default App;
