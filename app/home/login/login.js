import React from 'react';
import rx from 'resplendence';

import GoogleLogin from './google-login';

const Container = rx('div')`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  font-size: 20px;
  margin: 0;
  user-select: none;
  pointer-events: none;
  z-index: 20;
`

class Login extends React.PureComponent {
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
    }, 20);
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
    }, 20);
  }
  componentDidLeave() {
    this.props.doneAnimating();
  }
  render() {
    const { signIn } = this.props;
    const { leaving, entering, animating } = this.state;
    return (
      <Container>
        <GoogleLogin onClick={signIn}
                     leaving={leaving}
                     entering={entering}
                     animating={animating}/>
      </Container>
    )
  }
}

const { func } = React.PropTypes;
Login.propTypes = {
  signIn: func.isRequired
}

export default Login;
