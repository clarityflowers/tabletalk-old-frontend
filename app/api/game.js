'use strict'

function get(url, token, onload, onerror) {
  var request = new XMLHttpRequest();
  request.open('GET', process.env.API_URL + '/' + url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('token', token);
  request.onload = onload;
  request.onerror = onerror;
  request.send();
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

export default class Game {
  static index(success, fail) {
    let games = [];
    let length = Math.random() * 5;
    let j=0;
    for (let i=0; i < length; i++) {
      if (Math.random() > 0.5) {
        j++;
      }
      let name = "Game #" + j;
      games.push({
        name: name,
        type: 0,
        id: j
      })
      j++;
    }
    success(games);
  }
}
