import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './app.js';
import Games from './home/games.js';
import GameDetails from './home/game-details.js';

module.exports = (
  <Route path='/' component={App}>
    <Route path='games' component={Games}>
      <Route path=':game' component={GameDetails}/>
    </Route>
  </Route>
)
