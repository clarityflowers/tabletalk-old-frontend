'use strict'

import HTTP from './http.js';

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
  static index(resolve, reject) {
    HTTP.get('games', resolve, reject);
  }

  static create({name, type, player}, resolve, reject) {
    let body = {
      name: name,
      type: type,
      player: player
    }
    HTTP.post('games', body, resolve, reject);
  }
}
