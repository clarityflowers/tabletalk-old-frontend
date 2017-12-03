import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { loginWithGoogle, setPath } from './actionCreators';
import './fonts/fonts.scss';
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();

const enhance = compose(
  applyMiddleware(thunk.withExtraArgument({history})),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
  reducer, 
  {}, 
  enhance
);
history.listen((location, action) => store.dispatch(setPath({path: location.pathname})));

window.onSignIn = ({Zi}) => {
  const token = Zi.id_token;
  store.dispatch(loginWithGoogle(token));
}


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('root'));
registerServiceWorker();
