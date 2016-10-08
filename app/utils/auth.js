'use strict'

import User from 'api/user.js'

class Auth {
  static login(token, cb) {
    if (localStorage.token && localStorage.user_id && localStorage.user_name) {
      if (cb) {
        cb({
          loaded: true,
          isLoggedIn: true,
          user: {
            id: localStorage.user_id,
            name: localStorage.user_name
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
          localStorage.token = res.token
          localStorage.user_id = res.user,
          localStorage.user_name = res.name,
          localStorage.googleToken = token
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

  static reAuth(resolve, reject) {
    if (!localStorage.auth.googleToken) {
      reject({code: 401, message: "Not logged in"});
    }
    else {
      cb = (response) => {
        if (response.authenticated) {
          resolve();
        }
        else {
          reject({code: 401, message: "Not logged in"});
        }
      }
      login(localStorage.auth.googleToken, cb);
    }
  }

  static getToken() {
    return localStorage.token;
  }

  static logout() {
    delete localStorage.token;
    delete localStorage.user_id;
    delete localStorage.user_name;
    delete localStorage.googleAuth;
  }

  static loggedIn() {
    return (
      !!localStorage.token &&
      !!localStorage.user_id &&
      !!localStorage.user_name
    );
  }
}


export default Auth;
