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
    if (!this.props.loading && newProps.auth.online != this.props.auth.online) {
      this.setState({animating: true});
    }
  }
  doneAnimating() {
    this.setState({animating: false});
  }
  render() {
    let login = null;
    let games = null;
    let children = this.props.children;
    if (children) {
      children = React.cloneElement(children, {
        doneAnimating: this.doneAnimating.bind(this)
      })
    }
    if (this.props.loading || this.state.animating) {
      children = null;
    }
    else if (!this.props.auth.online) {
      login = (
        <Login signIn={this.props.auth.signIn}
               key='login'
               doneAnimating={this.doneAnimating.bind(this)}/>
      )
    }
    else {
    }
    return (
      <ReactTransitionGroup className='content' component='div' id='home'>
        {children}
        {login}
      </ReactTransitionGroup>
    )
  }
}

export default Home
