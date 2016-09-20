// libraries
import React from 'react';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// components
import { HoverBuzz } from './hover-animate.js';
// style
import './login.scss';

class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }
  onClick() {
    this.setState({clicked: true});
    this.props.onClick()
  }
  render() {
    let className = '';
    if (this.state.clicked) {
      className = 'clicked';
    }
    return (
      <HoverBuzz off={this.state.clicked}>
        <button
          id='google-login'
          className={className}
          onClick={this.onClick.bind(this)}
        >
          Sign in with Google
        </button>
      </HoverBuzz>
    )
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }
  render() {
    return (
      <div id='login'>
        <GoogleLogin onClick={this.props.onSignIn}/>
      </div>
    )
  }
}

export default withRouter(Login);
