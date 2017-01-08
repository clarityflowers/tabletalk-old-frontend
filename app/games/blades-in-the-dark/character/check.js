'use strict'

import React from 'react';
import cx from 'classnames';

import './check.scss';

const Check = (props) => {
  let className = cx(
    props.className, 'check', {
      checked: props.checked
    }
  )
  return (
    <button className={className} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
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

const makeCheckArray = ({
  value, max, Node, className, disabled, disableChecked, onClick
}) => {
  let array = [];
  let i=0;
  let props = {className, onClick}
  while (i < value && i < max) {
    array.push(
      <Node key={i} checked disabled={disableChecked || disabled} {...props} />
    )
    i++;
  }
  while (i < max) {
    array.push(
      <Node key={i} disabled={disabled} {...props}/>
    );
    i++;
  }
  return array;
}

export { Check, makeCheckArray };
