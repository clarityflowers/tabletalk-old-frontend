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

let requestCount = 0;

export default class Game {
  static index(resolve, reject) {
    // requestCount++;
    let games = [];
    let length = Math.random() * 5;
    length = 0;
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
    if (requestCount < 3) {
      resolve(games);
    }
    else {
      let code = 401
      let message = "not logged in"
      reject(code, message);
    }
  }
}
