import React from 'react';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { HoverBuzz } from 'utils/hover-animate.js';
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
    let className = cx({
      clicked: this.state.clicked,
      leaving: this.props.leaving,
      entering: this.props.entering,
      animating: this.props.animating
    });
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
      entering: false,
      leaving: false,
      animating: false
    }
  }
  componentWillEnter(callback) {
    this.setState({entering: true});
    setTimeout(() => {
      this.setState({animating: true});
      setTimeout(callback, 1000);
    }, 1);
  }
  componentDidEnter() {
    this.setState({
      animating: false,
      entering: false
    })
  }
  componentWillLeave(callback) {
    this.setState({leaving: true});
    setTimeout(() => {
      this.setState({animating: true});
      setTimeout(callback, 1000);
    }, 1);
  }
  componentDidLeave() {
    this.props.doneAnimating();
  }
  render() {
    return (
      <div id='login'>
        <GoogleLogin onClick={this.props.onSignIn}
                     leaving={this.state.leaving}
                     entering={this.state.entering}
                     animating={this.state.animating}/>
      </div>
    )
  }
}

export default Login;
