'use strict'

import React from 'react';
import cx from 'classnames';

import { Check, makeCheckArray } from 'games/blades-in-the-dark/character/check.js';

import './checkbox.scss';

const Checkbox = (props) => {
  let className = cx('checkbox', props.className);
  return (
    <Check checked={props.checked}
           disabled={props.disabled}
           className={className}
           onClick={props.onClick}/>
  )
}

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  className: null
}

const makeCheckboxArray = ({value, max, className, disabled, onClick}) => {
  return makeCheckArray({value, max, className, disabled, onClick, Node: Checkbox});
}

export { Checkbox, makeCheckboxArray}
