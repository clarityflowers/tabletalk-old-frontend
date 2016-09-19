import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app.js';
import Home from './home.js';


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)
