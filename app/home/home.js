import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import Login from './login.js';
import Games from './games.js'
import Auth from 'utils/auth.js';
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false
    }
  }
  componentWillReceiveProps(newProps) {
    if (!this.props.loading && newProps.loggedIn != this.props.loggedIn) {
      this.setState({animating: true});
    }
  }
  doneAnimating() {
    // let duration = this.props.loggedIn ? 150 : 50;
    // setTimeout(() => {
    this.setState({animating: false});
    // }, duration);
  }
  render() {
    let login = null;
    let children = null;
    if (!this.props.loading && !this.state.animating) {
      if (this.props.loggedIn) {
        children = (
          <Games key='games'
                 doneAnimating={this.doneAnimating.bind(this)}/>
        )
      }
      else {
        children = (
          <Login onSignIn={this.props.onSignIn}
                 key='login'
                 doneAnimating={this.doneAnimating.bind(this)}/>
        )
      }
    }
    return (
      <ReactTransitionGroup className='content' component='div' id='home'>
        {children}
      </ReactTransitionGroup>
    )
  }
}

export default Home
