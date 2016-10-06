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
    requestCount++;
    let games = [];
    let length = Math.random() * 5;
    let j=0;
    for (let i=0; i < length; i++) {
      let name = "Game #" + j;
      games.push({
        name: name,
        type: 0,
        id: j,
        maxPlayers: 5,
        me: 1,
        players: [
          {
            name: 'cerisa',
            admin: true
          },
          {
            name: 'dimosar',
            admin: false
          }
        ]
      })
      j++;
      if (Math.random() > 0.5) {
        j++;
      }
    }
    if (requestCount % 3 != 0) {
      resolve(games);
    }
    else {
      let code = 401
      let message = "Not logged in"
      reject(code, message);
    }
  }

  static create({name, type, player}, resolve, reject) {
    let result = {
      name: name,
      type: type,
      id: 200,
      maxPlayers: null,
      me: 0,
      players: [
        {
          name: player,
          admin: true
        }
      ]
    }
    setTimeout(() => {reject(401, "Not logged in")}, 4000);
  }
}
