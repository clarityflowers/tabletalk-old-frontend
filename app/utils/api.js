'use strict'

function post(url, token, data, onload, onerror) {
  var request = new XMLHttpRequest();
  request.open('POST', process.env.API_URL + '/' + url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('token', token);
  request.onload = onload;
  request.onerror = onerror;
  request.send(data);
}

export class User {
  static login(token, cb) {
    let onload = function() {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.responseText);
        cb({
          authenticated: true,
          token: data.token,
          name: data.name,
          user: data.user
        })
      } else {
        cb({ authenticated: false })
      }
    }
    let onerror = function() {
      cb({ authenticated: false })
    }
    post('login', token, null, onload, onerror);
  }
}
