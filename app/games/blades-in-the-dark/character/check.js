'use strict'

import React from 'react';
import cx from 'classnames';

import './check.scss';

const Check = (props) => {
  let className = cx(
    props.className, 'check', {
      checked: props.checked,
      disabled: props.disabled
    }
  )
  return (
    <button className={className} onClick={props.onClick}>{props.children}</button>
  )
}

Check.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

Check.defaultProps = {
  checked: false,
  disabled: false,
  className: null,
}

const makeCheckArray = ({value, max, Node, className, disabled, onClick}) => {
  let array = [];
  let i=0;
  let props = {className, disabled, onClick}
  while (i < value && i < max) {
    array.push(
      <Node key={i} checked={true} {...props} />
    )
    i++;
  }
  while (i < max) {
    array.push(
      <Node key={i} checked={false} {...props}/>
    );
    i++;
  }
  return array;
}

export { Check, makeCheckArray };
