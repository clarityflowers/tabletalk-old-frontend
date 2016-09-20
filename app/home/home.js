// libraries
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// components
import Login from './login.js';
// utilities
import Auth from 'utils/auth.js';
// style
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let login = null;
    let content = null;
    if (!this.props.loading) {
      if (this.props.loggedIn) {
        content = this.props.children
      }
      else {
        login = <Login onSignIn={this.props.onSignIn}/>
      }
    }
    return (
      <div id='home'>
        <ReactCSSTransitionGroup
          transitionName="home"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={1000}>
          {login}
        </ReactCSSTransitionGroup>
        {content}
      </div>
    )
  }
}

export default Home
