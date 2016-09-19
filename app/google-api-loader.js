'use strict'

var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

module.exports = {
  authLoaded: function (callback) {
    var check = function () {
      if (auth2Loaded && sign2Loaded) {
        callback();
      }
      else {
        window.setTimeout(function () {
          check();
        }, 50);
      }
    }

    check();
  },
  gapiLoaded: function (callback) {
    var hasgapi = function () {
      if (typeof (gapi) !== "undefined" && gapi.client) {
        callback();
      }
      else {
        window.setTimeout(function () {
          hasgapi();
        }, 50);
      }
    }

    hasgapi();
  },
  getAuth2: function () {
    return auth2;
  },
  signIn: function () {
    var options = new gapi.auth2.SigninOptionsBuilder({
      scopes: ['email']
    });
    this.getAuth2().signIn(options).then(function (success) {
      // TODO on signin success
    }, function (fail) {
      // TODO on signin failure
    });
  },
  signOut: function () {
    this.getAuth2().signOut().then(function (success) {
      // TODO on signout success
    }, function (fail) {
      // TODO on signout failre
    })
  }
};


module.exports.gapiLoaded(function () {
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id: process.env.GOOGLE_CLIENT_ID,
      scopes: ['email']
    });
    auth2Loaded = true;
  });

  gapi.load('signin2', function () {
      sign2Loaded = true;
  });

  var clientLoaded = function clientLoaded() {
      clientsLoaded++;
  }
});
