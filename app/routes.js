import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app.js';
import Games from './home/games.js';

module.exports = (
  <Route path='/' component={App}>
    <Route path='games/new' component={Games}/>
  </Route>
)
