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
  componentDidMount() {
    this.redirect();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.auth.online != this.props.auth.online) {
      this.setState({animating: true});
    }
  }
  componentDidUpdate() {
    this.redirect();
  }
  redirect() {
    if (this.props.route.isExact && this.props.auth.online) {
      this.props.route.push('games').replace();
    }
  }
  doneAnimating() {
    this.setState({animating: false});
  }
  render() {
    let content = null;
    let login = null;
    if (!this.state.animating && !this.props.loading && !this.props.auth.online) {
      login = (
        <Login signIn={this.props.auth.signIn}
               key='login'
               doneAnimating={this.doneAnimating.bind(this)}/>
      )
    }
    let route = this.props.route;
    if (!route.isExact) {
      route = this.props.route.next();
      if (route.name == 'games') {
        content = (
          <Games route={route}
                 auth={this.props.auth}
                 options={this.props.options}
                 doneAnimating={this.doneAnimating.bind(this)}/>
        );
      }
    }
    return (
      <div>
        <ReactTransitionGroup className='content' component='div' id='home'>
          {content}
        </ReactTransitionGroup>
        {login}
      </div>
    )
  }
}

export default Home
