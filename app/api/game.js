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
    HTTP.get({url: 'games', resolve, reject});
  }

  static create({name, type, player}, resolve, reject) {
    let body = {
      name: name,
      type: type,
      player: player
    }
    HTTP.post({url: 'games', body, resolve, reject});
  }

  static show({game}, resolve, reject) {
    HTTP.get({url: `games/${game}`, resolve, reject});
  }

  static join({game, player}, resolve, reject) {
    HTTP.post({
      url: `games/${game}/join`,
      params: {player: player},
      resolve,
      reject
    });
  }

  static load({game}, resolve, reject) {
    HTTP.get({
      url: `games/${game}/load`,
      resolve,
      reject
    });
  }
}
