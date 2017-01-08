import React from 'react';
import { createBrowserHistory } from 'history';
import App from './app.js';
import Route from 'utils/route.js';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: []
    }
    this.history = null;
    'test';
  }
  componentDidMount() {
    this.history = createBrowserHistory();
    this.history.listen(this.handleLocationChange.bind(this));
    this.setPath(this.history.location.pathname);
  }
  setPath(pathname) {
    let path = Route.splitPathname(pathname);
    this.setState({path: path});
  }
  handleLocationChange(location, action) {
    this.setPath(location.pathname);
  }
  render() {
    let app = null;
    if (this.history != null) {
      let route = new Route(
        this.state.path,
        0,
        this.history.push,
        this.history.replace
      );
      app = (
        <App route={route}/>
      )
    }
    return (
      <div id='router'>
        {app}
      </div>
    );
  }
}

export default Router;
