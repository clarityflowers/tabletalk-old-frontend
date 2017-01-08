'use strict'

import React from 'react';
import cx from 'classnames';

import { Check, makeCheckArray } from 'games/blades-in-the-dark/character/check.js';

import './dot.scss';

const Dot = (props) => {
  let className = cx('dot', props.className);
  return (
    <Check checked={props.checked}
           disabled={props.disabled}
           className={className}
           onClick={props.onClick}>
      @
    </Check>
  )
}

Dot.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}

Dot.defaultProps = {
  checked: false,
  disabled: false,
  className: null
}

const makeDotArray = ({value, max, className, disabled, onClick}) => {
  return makeCheckArray({value, max, className, disabled, onClick, Node: Dot});
}

export { Dot, makeDotArray };
