'use strict'

import React from 'react';
import cx from 'classnames';

import { Check, CheckArray, makeCheckArray } from 'games/blades-in-the-dark/character/check.js';

import './checkbox.scss';

const Checkbox = (props) => {
  let className = cx('checkbox', props.className);
  let properties = Object.assign({}, props);
  delete properties.className;
  return (
    <Check className={className} {...properties}/>
  )
}

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  className: null
}

const CheckboxArray = (props) => {
  return (
    <CheckArray node={Checkbox} {...props}/>
  );
}

CheckboxArray.propTypes = {
  value: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
  nodeClassName: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  checkedProps: React.PropTypes.object,
  uncheckedProps: React.PropTypes.object
}

CheckboxArray.defaultProps = {
  disabled: false,
  disableChecked: false
}

const makeCheckboxArray = ({value, max, className, disabled, onClick}) => {
  return makeCheckArray({value, max, className, disabled, onClick, Node: Checkbox});
}

export { Checkbox, CheckboxArray, makeCheckboxArray}
