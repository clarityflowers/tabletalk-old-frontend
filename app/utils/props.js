'use strict'

import React from 'react';

import filter from './filter';

const props = (Component, ...properties) => {
  return (props) => {
    const result = filter(props, ...properties, 'children');
    return (
      <Component {...result}>{props.children}</Component>
    )
  };
}

export default props;
