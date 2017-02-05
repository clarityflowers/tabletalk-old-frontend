'use strict'

import React from 'react';
import cx from 'classnames';

const cz = (Component, names, namesPassThrough) => {
  return (props) => {
    const properties = Object.assign({}, props);
    let ref = null;
    if ('innerRef' in properties) {
      ref = properties.innerRef;
      delete properties.innerRef;
    }
    let classNames = [];
    if (names != undefined) {
      if (names.constructor !== Array) {
        names = [names];
      }
      for (let i=0; i < names.length; i++) {
        const name = names[i];
        if (props[name]) {
          classNames.push(name);
        }
        delete properties[name];
      }
    }
    if (namesPassThrough != undefined) {
      if (namesPassThrough.constructor !== Array) {
        namesPassThrough = [namesPassThrough];
      }
      for (let i=0; i < namesPassThrough.length; i++) {
        const name = namesPassThrough[i];
        if (props[name]) {
          classNames.push(name);
        }
      }
    }
    const className = cx(props.className, classNames);
    delete properties.className;
    return (
      <Component ref={ref} className={className} {...properties}/>
    );
  }
}

export default cz;
