'use strict'

module.exports = {
  login(token, cb) {
    if (localStorage.auth && localStorage.auth.token) {
      if (cb) {
        cb({
          isLoggedIn: true,
          user: {
            id: localStorage.auth.id,
            name: localStorage.auth.name
          }
        });
      }
    }
    else {
      apiLogin(token, (res) => {
        let result = {
          isLoggedIn: false,
          user: {
            id: null,
            name: null
          }
        }
        if (res.authenticated) {
          localStorage.auth = {
            token: res.token,
            id: res.user,
            name: res.name
          }
          result = {
            isLoggedIn: true,
            user: {
              id: res.user,
              name: res.name
            }
          };
        }
        if (cb) { cb(result); }
      });
    }
  },

  getToken() {
    if (localStorage.auth) {
      return localStorage.auth.token;
    }
    else {
      return null;
    }
  },

  logout() {
    delete localStorage.auth
  },

  loggedIn() {
    return !!localStorage.auth
  },
}

function apiLogin(token, cb) {
  var request = new XMLHttpRequest();
  request.open('POST', process.env.API_URL + '/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('token', token);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb({
        authenticated: true,
        token: data.token,
        name: data.name,
        user: data.user
      })
    } else {
      cb({ authenticated: false })
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
}
