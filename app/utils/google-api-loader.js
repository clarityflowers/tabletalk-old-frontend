var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

class GoogleApiLoader {
  static authLoaded(callback) {
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
  }

  static gapiLoaded(callback) {
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
  }

  static getAuth2() {
    return auth2;
  }

  static signIn() {
    var options = new gapi.auth2.SigninOptionsBuilder({
      scopes: ['email']
    });
    this.getAuth2().signIn(options).then(function (success) {
      // TODO on signin success
    }, function (fail) {
      // TODO on signin failure
    });
  }

  static signOut() {
    this.getAuth2().signOut().then(function (success) {
      // TODO on signout success
    }, function (fail) {
      // TODO on signout failre
    })
  }
};

GoogleApiLoader.gapiLoaded(() => {
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

export default GoogleApiLoader;
