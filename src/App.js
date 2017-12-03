import React, { Component } from 'react';
import { connect } from 'react-redux';
import rx from 'resplendence';



import {
  goTo,
  goBack
} from './actionCreators';


const Container = rx('div')`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Card = rx('div')`
  background: hsla(0, 100%, 100%, 1);
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .1);
  padding: 40px;
  min-width: 800px;
  display: flex;
  flex-flow: column;
  align-items: center;
`

const Title = rx('div')`
  font-family: "Marvin Visions";
  color: #B24592;
  font-size: 160px;
  margin: 10px 0;
  text-align: center;
`

const Status = rx('div')`
  font-family: "League Spartan";
  color: #F15F79;
  font-size: 40px;
  margin: 10px 0;
  text-align: center;
`

let GoogleLoginButton = ({className}) => <div className={`g-signin2 ${className}`} data-onsuccess="onSignIn"/>;
GoogleLoginButton = rx(GoogleLoginButton)`
  display: none;
  &.show {
    display: block;
  }
`

class App extends Component {
  render() {
    const { loggingIn, loggedIn, loginError } = this.props;
    
    const { path, goTo, goBack } = this.props;

    let content;
    if (loggedIn) content = <Status onClick={goBack}>Logged in!</Status>
    else if (loggingIn) content = <Status>....logging in</Status>
    else if (loginError) content = <Status>failed!</Status>

    const here = [""];

    return (
      <Container>
        <Card>
          <Title onClick={() => goTo([...here, "games"])}>Tabletalk</Title>
          {content}
          <GoogleLoginButton rx={{show: (!loggedIn && !loggedIn)}}/>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = ({auth, path}) => {
  return {
    loggingIn: auth.pending,
    loggedIn: !!auth.jwt,
    loginError: auth.error,
    path
  }
}

const mapDispatchToProps = {goTo, goBack}

export default connect(mapStateToProps, mapDispatchToProps)(App);
