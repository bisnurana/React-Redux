require('./css/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
//automatically authenticating user
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
