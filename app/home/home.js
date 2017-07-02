import React from 'react';
import rx from 'resplendence';
import ReactTransitionGroup from 'react-addons-transition-group';
import Login from './login/login.js';
import Games from './games/games.js';
import Auth from 'utils/auth.js';

const Container = rx('div')`
  background-color: transparent;
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  margin: 0;
  overflow: hidden;
`

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
      <Container>
        <ReactTransitionGroup component='div'>
          {content}
          {login}
        </ReactTransitionGroup>
      </Container>
    )
  }
}

export default Home
