import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { setGoogleJWT } from 'Auth/actionCreators';
import { route } from 'Routing/actionCreators';
import './fonts/fonts.scss';
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let enhance = applyMiddleware(thunk.withExtraArgument({history}));

if (devTools) {
  enhance = compose(enhance, devTools);
}

const pathToArray = pathname => {
  let path = pathname.split('/');
  if (path[path.length - 1] === '') {
    path = path.slice(0, path.length - 1);
  }
  if (path[0] === '') {
    path = path.slice(1);
  }
  return path;
}


const store = createStore(
  reducer, 
  {}, 
  enhance
);

const handleHistoryChange = (location) => {
  store.dispatch(route(pathToArray(location.pathname)));
}

handleHistoryChange(history.location);

history.listen(handleHistoryChange);

window.onSignIn = (args) => {
  const jwt = args.Zi.id_token;
  store.dispatch(setGoogleJWT({jwt}));
}


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('root'));
registerServiceWorker();
