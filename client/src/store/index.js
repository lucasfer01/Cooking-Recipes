import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : '';

const enhancer = composeEnhancers(
        applyMiddleware(thunk),
      );

const store = createStore(reducer, enhancer);

export default store;