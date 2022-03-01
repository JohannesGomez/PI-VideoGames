import {createStore, applyMiddleware, compose} from 'redux';
//import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const composeWithDevTools = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));



export default store;
