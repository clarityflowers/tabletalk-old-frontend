import React from 'react';
import update from 'react-addons-update';
import Home from './home/home.js';
import GoogleApiLoader from 'utils/google-api-loader.js';
import Auth from 'utils/auth.js';
import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: false,
      googleAuth: {
        loaded: false,
        isLoggedIn: false
      },
      apiAuth: {
        isLoggedIn: false,
        loaded: true,
        user: {
          id: null,
          name: null
        }
      }
    }
  }
  setAuthReady() {
    this.setState({googleAuth: update(this.state.googleAuth, {loaded: {$set: true}})});
  }
  updateAuth(apiAuth) {
    this.setState({apiAuth: apiAuth});
  }
  onSignInChange(isSignedIn) {
    let googleAuth = this.state.googleAuth;
    let apiAuth = this.state.apiAuth;
    if (!googleAuth.loaded && !apiAuth.isLoggedIn) {
      this.setState((state) => {
        let auth = Object.assign({}, state.apiAuth);
        auth.loaded = false;
        return ({apiAuth: auth});
      });
    }
    googleAuth = update(googleAuth, {loaded: {$set: true}});
    if (isSignedIn) {
      let user = GoogleApiLoader.getAuth2().currentUser.get();
      let response = user.getAuthResponse();
      if (response) {
        Auth.login(response.id_token, this.updateAuth.bind(this));
      }
    }
    googleAuth = update(googleAuth, {isLoggedIn: {$set: isSignedIn}});
    this.setState({googleAuth: googleAuth});
  }
  onAuthLoaded() {
    GoogleApiLoader.getAuth2().isSignedIn.listen(this.onSignInChange.bind(this));
    setTimeout(this.setAuthReady.bind(this), 1000);
  }
  componentDidMount() {
    GoogleApiLoader.authLoaded(this.onAuthLoaded.bind(this));
  }
  signIn() {
    if (!GoogleApiLoader.getAuth2().isSignedIn.get()) {
      GoogleApiLoader.signIn();
    }
  }
  signOut() {
    if (GoogleApiLoader.getAuth2().isSignedIn.get()) {
      GoogleApiLoader.signOut();
    }
    this.setState({
      apiAuth: {
        isLoggedIn: false,
        loaded: true,
        user: {
          id: null,
          name: null
        }
      }
    })
    Auth.logout();
  }
  openOptions() {
    this.setState({options: true});
  }
  closeOptions() {
    this.setState({options: false});
  }
  componentDidUpdate() {
    let loggedIn = false;
    if (this.state.googleAuth.loaded) {
      if (this.state.googleAuth.isLoggedIn) {
        if (Auth.loggedIn()) {
          loggedIn = true;
        }
      }
    }
    if (loggedIn && !this.state.options) {
      setTimeout(this.openOptions.bind(this), 1000);
    }
    else if (!loggedIn && this.state.options) {
      this.closeOptions();
    }
  }
  render() {
    let loggedIn = false;
    let name = '';
    if (this.state.googleAuth.loaded) {
      if (this.state.googleAuth.isLoggedIn) {
        if (Auth.loggedIn()) {
          loggedIn = true;
        }
      }
    }
    let auth = {
      name: this.state.apiAuth.user.name,
      online: this.state.apiAuth.isLoggedIn,
      signIn: this.signIn.bind(this),
      signOut: this.signOut.bind(this)
    }
    let loading = !(this.state.googleAuth.loaded && this.state.apiAuth.loaded);
    return (
      <div id='app'>
        <Home route={this.props.route}
              loading={loading}
              auth={auth}
              options={this.state.options}/>
      </div>
    )
  }
}

export default App;
