import React, { Component } from 'react';
import { connect } from 'react-redux';
import rx from 'resplendence';

import Games from 'Games';
import Auth from 'Auth';

import { getStatus } from 'Status/actionCreators';
import { login, loginReady } from 'Auth/actionCreators';
import { replace } from 'Routing/actionCreators';

import { subPath } from 'utils/pathTools';

import Spinner from 'common/components/Spinner';

const Container = rx('div')`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;
`

class App extends Component {
  componentDidMount() {
    const { getStatus } = this.props;
    getStatus();
  }
  componentDidUpdate(prevProps) {
    {
      const { up, googleLoggedIn, login } = this.props;

      const canLogIn = (up && googleLoggedIn);
      const couldLogIn = (prevProps.up && prevProps.googleLoggedIn);
      if (!couldLogIn && canLogIn) {
        login();
      }
    }
    {
      const { up, loginReady } = this.props;
      if (!prevProps.up && up) {
        setTimeout(loginReady, 500);
      }
    }
    {
      const { path, loggedIn, replace } = this.props;
      if (loggedIn && path.length === 0) {
        replace(["games"]);
      }
    }
  }
  render() {
    const { loggedIn, ready, path } = this.props;

    const paths = [
      {
        path: "games",
        className: Games
      }
    ]

    let content;
    if (!ready) content = <Spinner/>;
    else if (loggedIn) {
      for (let i=0; i < paths.length; i++) {
        const entry = paths[i];
        const [here, ...tail] = path;
        if (here === entry.path) {
          const Node = entry.className;
          content = <Node here={[here]} path={tail}/>
        }
      }
    }

    return (
      <Container>
        <Auth/>
        {content}
      </Container>
    );
  }
}

const mapStateToProps = ({auth, path, status}) => {
  return {
    up: status.up,
    ready: auth.ready,
    googleLoggedIn: !!auth.googleJwt,
    loggedIn: !!auth.jwt,
    path
  }
}

const mapDispatchToProps = { getStatus, login, loginReady, replace };

export default connect(mapStateToProps, mapDispatchToProps)(App);
