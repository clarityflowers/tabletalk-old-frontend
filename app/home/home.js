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
    this.setState({animating: false});
  }
  render() {
    let login = null;
    let children = null;
    if (!this.props.loading && !this.state.animating) {
      if (this.props.loggedIn) {
        children = (
          <Games key='games'
                 doneAnimating={this.doneAnimating.bind(this)}
                 target={this.props.target}
                 signOut={this.props.signOut}>
          </Games>
        )
      }
      else {
        children = (
          <Login signIn={this.props.signIn}
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
