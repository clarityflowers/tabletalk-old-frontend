import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './routes.js';

render(
  <Router routes={Routes} history={browserHistory}/>,
  document.getElementById('app')
)
