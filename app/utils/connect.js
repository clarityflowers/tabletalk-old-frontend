'use strict'

import React from 'react';

const connect = (Component) => {
  const result = (props, context) => {
    return (
      <Component dispatch={context.dispatch} {...props}/>
    );
  }
  result.contextTypes = {
    dispatch: React.PropTypes.func
  }
  return result;
}

export default connect;
