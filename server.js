"use strict";
const express = require('express');
let app = express();
app.use(express.static('public'));

const PORT = process.env.PORT
if (!PORT) {
  console.error('PORT vnvironment variable must be set');
  console.log('Exiting');
  return 1;
}

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
})
