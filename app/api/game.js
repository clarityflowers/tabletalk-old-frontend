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

  static show({game}, resolve, reject) {
    // HTTP.get(`games/${game}`, resolve, reject);
    let result = {
      id: game,
      name: "Worlb of Avdetnure",
      type: 0,
      isVisible: false,
      players: [{
        name: 'Cerisa',
        admin: true
      }],
      me: null,
      maxPlayer: null
    }
    setTimeout(() => {resolve(result);}, 4000);
  }

  static join({player}, resolve, reject) {
  let result = {
    id: '967a2eae-acf9-4d5f-adcd-edf53f73b2dd',
    name: "Worlb of Avdetnure",
    type: 0,
    isVisible: false,
    players: [
      {
        name: 'Cerisa',
        admin: true
      },
      {
        name: 'Amy',
        admin: false
      }
    ],
    me: 1,
    maxPlayer: null
  }
  // setTimeout(() => {resolve(result);}, 4000);
  setTimeout(() => {reject({code: 401, error: 'Authentication failure'});}, 4000);
  }
}
