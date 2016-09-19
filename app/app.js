// libraries
import React from 'react';
import update from 'react-addons-update';
// components
import OptionsMenu from './options-menu.js';
import Home from './home.js';
// style
import './app.scss';
// utils
import GoogleApiLoader from './google-api-loader.js';
import Auth from './auth.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: false,
      googleAuth: {
        user: {
          email: null
        },
        loaded: false,
        isLoggedIn: false
      }
    }
  }
  setAuthReady() {
    this.setState({googleAuth: update(this.state.googleAuth, {loaded: {$set: true}})});
  }
  onSignInChange(isSignedIn) {
    let googleAuth = this.state.googleAuth;
    googleAuth = update(googleAuth, {loaded: {$set: true}});
    if (isSignedIn) {
      let user = GoogleApiLoader.getAuth2().currentUser.get();
      let profile = user.getBasicProfile();
      let response = user.getAuthResponse();
      if (user) {
        var profileProxy = {};
        profileProxy.email = profile.getEmail();
        googleAuth = update(googleAuth, {user: {$set: profileProxy}});
      }
      if (response) {
        Auth.login(response.id_token, (success) => {
          this.forceUpdate();
        });
      }
      else {
        googleAuth = update(googleAuth, {user: {$set: null}});
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
    let children = (
      <div>
        <Home loading/>
      </div>
    )
    let loggedIn = false;
    let name = '';
    if (this.state.googleAuth.loaded) {
      if (this.state.googleAuth.isLoggedIn) {
        if (Auth.loggedIn()) {
          loggedIn = true;
          name=this.state.googleAuth.user.email;
        }
      }
      children = (
        <div>
        {this.props.children && React.cloneElement(this.props.children, {
          loggedIn: loggedIn,
          onSignIn: this.signIn
        })}
        </div>
      )
    }
    return (
      <div id='app'>
        <OptionsMenu
          loggedIn={loggedIn && this.state.options}
          onSignOut={this.signOut}
          name={this.state.googleAuth.user.email}
        />
        {children}
      </div>
    )
  }
}

export default App;
