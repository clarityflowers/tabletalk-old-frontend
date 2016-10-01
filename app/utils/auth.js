'use strict'

import User from 'api/user.js'

class Auth {
  static login(token, cb) {
    if (localStorage.auth && localStorage.auth.token) {
      if (cb) {
        cb({
          loaded: true,
          isLoggedIn: true,
          user: {
            id: localStorage.auth.id,
            name: localStorage.auth.name
          }
        });
      }
    }
    else {
      User.login(token, (res) => {
        let result = {
          loaded: true,
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
            loaded: true,
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
  }

  static getToken() {
    if (localStorage.auth) {
      return localStorage.auth.token;
    }
    else {
      return null;
    }
  }

  static logout() {
    delete localStorage.auth
  }

  static loggedIn() {
    return !!localStorage.auth
  }
}


export default Auth;
