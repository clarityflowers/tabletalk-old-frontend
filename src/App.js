import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { Socket } from 'phoenix';

import {
  loginWithGoogle
} from './actionCreators';


const GoogleLoginButton = () => <div className="g-signin2" data-onsuccess="onSignIn"/>;

class App extends Component {
  render() {
    const { loggingIn, loggedIn, loginError } = this.props;
    let content;
    if (loggedIn) content = <div>Logged in!</div>
    else if (loggingIn) content = <div>....logging in</div>
    else if (loginError) content = <div>failed!</div>

    return (
      <div>
        {content}
        <div style={{display: (!loggedIn && !loggingIn) ? 'block' : 'none'}}>
          <GoogleLoginButton/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    loggingIn: auth.pending,
    loggedIn: !!auth.jwt,
    loginError: auth.error
  }
}

const mapDispatchToProps = {loginWithGoogle}

export default connect(mapStateToProps, mapDispatchToProps)(App);
