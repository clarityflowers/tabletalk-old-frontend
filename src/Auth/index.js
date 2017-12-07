import React from 'react';
import { connect } from 'react-redux';
import rx from 'resplendence';

rx`
@import "~common/styles";
`

const Card = rx('div')`
  @include card;
  padding: 40px;
  display: none;
  flex-flow: column;
  align-items: center;
  max-width: 800px;
  &.show {
    display: flex;
  }
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

class Auth extends React.Component {
  render() {
    const {loggedIn, loggingIn, loginError, ready} = this.props;
    let status = null;
    if (loggingIn) status = <Status>....logging in</Status>
    else if (loginError) status = <Status>failed!</Status>
    return (
      <Card rx={{show: (ready && !loggedIn && !loggingIn)}}>
        <Title>Tabletalk</Title>
        {status}
        <GoogleLoginButton/>
      </Card>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    ready: auth.ready,
    loggedIn: !!auth.jwt,
    loggingIn: auth.pending,
    loginError: auth.error
  }
}

export default connect(mapStateToProps, {})(Auth);
