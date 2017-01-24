'use strict'

import React from 'react';

import filter from './filter';

const props = (component, ...properties) => {
  return (props) => {
    const result = filter(props, ...properties, 'children');
    return React.cloneElement(component, result, props.children);
  };
}

export default props;
