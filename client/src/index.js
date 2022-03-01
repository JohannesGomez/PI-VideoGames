import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // ???
import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(

  <Provider store={store}> {/*  en volver mi aplicacion en el provider */}
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
    
);
