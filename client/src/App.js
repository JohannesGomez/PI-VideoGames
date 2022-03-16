import React       from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import './App.css';
// import NavBar from './components/NavBar';
// import VgDetail from './components/VgDetail';
// import VgCreate from './components/vgCreate';
import VideoGameCreate from './components/VideoGameCreate';
import VideoGameDetail from './components/VideoGameDetail';

// crear mis rutas
function App() {
  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <Route exact path  = '/'                       component = {LandingPage}/> 
      <Route exact path  = '/home'                   component = {Home}/>
      <Route exact path  = '/videogame/:idVideogame' component = {VideoGameDetail}/>
      <Route exact path  = '/videoGameCreated'       component = {VideoGameCreate}/> 
      </React.Fragment>
  );
}

export default App;
