"use strict";

const REQUIRED_ENVS = [
  'PORT'
];
for(let i=0; i < REQUIRED_ENVS.length; i++) {
  if (!process.env[REQUIRED_ENVS[i]]) {
    console.error('ERROR: ' + REQUIRED_ENVS[i] + ' environment variable must be set');
  }
}

const express = require('express');
let app = express();

app.use(express.static('public'));

app.listen(process.env.PORT, function() {
  console.log('Server started on port ' + process.env.PORT);
})
