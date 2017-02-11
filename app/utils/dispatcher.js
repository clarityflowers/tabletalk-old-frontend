'use strict'

import React from 'react';

class Dispatcher extends React.PureComponent {
  getChildContext() {
    const { dispatch } = this.props;
    return { dispatch: dispatch };
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

Dispatcher.childContextTypes = {
  dispatch: React.PropTypes.func
}

export default Dispatcher;
