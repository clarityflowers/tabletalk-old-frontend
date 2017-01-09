'use strict'

import React from 'react';
import cx from 'classnames';

import './check.scss';

const Check = (props) => {
  let className = cx(
    props.className, 'check', {
      checked: props.checked
    }
  );
  let properties = Object.assign({}, props);
  delete properties.checked;
  delete properties.className;
  return (
    <button className={className} {...properties}>
      {props.children}
    </button>
  )
}

Check.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
}

Check.defaultProps = {
  checked: false,
  disabled: false,
}

const CheckArray = (props) => {
  const {
    value, max, node,
    className, nodeClassName, disabled,
    increment, decrement,
    highlight,
    checkedProps, uncheckedProps
  } = props;
  const Node = node;
  let array = [];
  let i=0;
  while (i < value && i < max) {
    let className = cx(
      nodeClassName, {
        hover: i >= value + highlight,
      }
    );
    array.push(
      <Node key={i}
            checked
            disabled={disabled}
            onClick={decrement}
            className={className}
            {...checkedProps}/>
    )
    i++;
  }
  while (i < max) {
    let className = cx(
      nodeClassName, {
        hover: i < value + highlight,
      }
    );
    array.push(
      <Node key={i}
            disabled={disabled}
            onClick={increment}
            className={className}
            {...uncheckedProps}/>
    );
    i++;
  }
  return (
    <div className={className}>
      {array}
    </div>
  );
}

CheckArray.propTypes = {
  value: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  node: React.PropTypes.any.isRequired,
  className: React.PropTypes.string,
  nodeClassName: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  checkedProps: React.PropTypes.object,
  uncheckedProps: React.PropTypes.object
}

CheckArray.defaultProps = {
  disabled: false,
  disableChecked: false,
  highlight: 0
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

export { Check, CheckArray, makeCheckArray };
