module.exports = {
  login(token, cb) {
    if (localStorage.token) {
      if (cb) {cb(true);}
    }
    else {
      pretendRequest(token, (res) => {
        let result = false
        if (res.authenticated) {
          localStorage.token = res.token;
          result = true;
        }
        if (cb) { cb(result); }
      });
    }
  },

  getToken() {
    return localStorage.token
  },

  logout() {
    delete localStorage.token
  },

  loggedIn() {
    return !!localStorage.token
  },
}

function pretendRequest(token, cb) {
  setTimeout(() => {
    if (token != 'bad') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
