import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import Login from './login.js';
import Games from './games.js';
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
    if (newProps.auth.online != this.props.auth.online) {
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
      children = React.Children.map(this.props.children,
        (child) => React.cloneElement(child, {
          auth:  this.props.auth,
          options: this.props.options,
          doneAnimating: this.doneAnimating.bind(this)
        })
      )
    }
    if (!this.state.animating && !this.props.loading && !this.props.auth.online) {
      login = (
        <Login signIn={this.props.auth.signIn}
               key='login'
               doneAnimating={this.doneAnimating.bind(this)}/>
      )
    }
    return (
      <div>
        <ReactTransitionGroup className='content' component='div' id='home'>
          {children}
          {login}
        </ReactTransitionGroup>
      </div>
    )
  }
}

export default Home
