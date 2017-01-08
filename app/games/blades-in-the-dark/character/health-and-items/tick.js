'use strict'

import React from 'react';
import cx from 'classnames';

import { Check, makeCheckArray } from 'games/blades-in-the-dark/character/check.js';

import './tick.scss';

const Tick = (props) => {
  let className = cx('tick', props.className)
  return (
    <Check className={className}
           disabled={props.disabled}
           onClick={props.onClick}
           checked={props.checked}>
      <svg x="0px"
           y="0px"
           preserveAspectRatio="none"
           width=".5em"
           height="1.2em"
           viewBox="0 0 50 100">
	       <polygon points="0,0 50,0 50,75 0,100"/>
      </svg>
    </Check>
  );
}

Tick.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

Tick.defaultProps = {
  checked: false,
  disabled: false,
  className: null,
}

const makeTickArray = ({
  value, max, className, disabled, disableChecked, onClick
}) => {
  return makeCheckArray({
    value, max, className, disabled, disableChecked, onClick, Node: Tick
  });
}

export { Tick, makeTickArray };
