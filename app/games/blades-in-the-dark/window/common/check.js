'use strict'

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Row from 'common/row';
import Button from 'common/button';

import filter from 'utils/filter';

const Check = (props) => {
  const {
    className, checked,
    onClick, onHover,
    value, highlight,
    isButton, ...buttonProps
  } = props;
  const { disabled } = buttonProps;
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick(value);
    }
  };
  const handleMouseOver = () => {
    if (onHover && !disabled) {
      onHover(value);
    }
  };
  const handleMouseLeave = () => {
    if (onHover && !disabled) {
      onHover(null);
    }
  };
  const buttonClassName = cx(className, 'check', {checked, highlight});
  let result = null;
  if (isButton) {
    result = (
      <Button className={buttonClassName}
              onClick={handleClick.bind(this)}
              onMouseOver={handleMouseOver.bind(this)}
              onMouseLeave={handleMouseLeave.bind(this)}
              {...buttonProps}>
        {props.children}
      </Button>
    );
  }
  else {
    result = (
      <div className={buttonClassName} {...buttonProps}>
        {props.children}
      </div>
    );
  }
  return result;
}

Check.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onHover: React.PropTypes.func,
  value: React.PropTypes.number,
  highlight: React.PropTypes.bool,
  isButton: React.PropTypes.bool
}

Check.defaultProps = {
  checked: false,
  className: null,
  onClick: null,
  onHover: null,
  value: null,
  highlight: null,
  isButton: true
}

const CheckArray = (props) => {
  const {
    value, offset, length, node,
    className, nodeClassName, isButton,
    highlight, checkedProps, uncheckedProps,
    increment, decrement, ...rest
  } = props;
  const Node = node;
  let checkedArray = [];
  let uncheckedArray = [];
  let i=offset;
  while (i < value && i < length + offset) {
    let className = cx(nodeClassName, {
        highlight: i >= value + highlight,
    });
    checkedArray.push(
      <Node key={i}
            className={className}
            value={i+1}
            checked
            highlight={i >= value + highlight}
            isButton={false}/>
    )
    i++;
  }
  while (i < length + offset) {
    uncheckedArray.push(
      <Node key={i}
            className={nodeClassName}
            value={i+1}
            highlight={i < value + highlight}
            isButton={false}/>
    );
    i++;
  }
  if (isButton) {
    if (checkedArray.length > 0) {
      checkedArray = (
        <Button onClick={decrement} {...checkedProps} {...rest}>
          <Row>
            {checkedArray}
          </Row>
        </Button>
      );
    }
    if (uncheckedArray.length > 0) {
      uncheckedArray = (
        <Button onClick={increment} {...uncheckedProps} {...rest}>
          <Row>
            {uncheckedArray}
          </Row>
        </Button>
      );
    }
  }
  return (
    <Row className={className}>
      {checkedArray}
      {uncheckedArray}
    </Row>
  );
}

CheckArray.propTypes = {
  value: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number,
  length: React.PropTypes.number.isRequired,
  node: React.PropTypes.any.isRequired,
  className: React.PropTypes.string,
  nodeClassName: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  checkedProps: React.PropTypes.object,
  uncheckedProps: React.PropTypes.object,
  isButton: React.PropTypes.bool,
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func
}

CheckArray.defaultProps = {
  disabled: false,
  highlight: 0,
  offset: 0,
  isButton: true
}

const extendCheck = ({name, children}) => {
  const node = (props) => {
    let className = cx(name, props.className);
    let properties = Object.assign({}, props);
    delete properties.className;
    return (
      <Check className={className} {...properties}>
        {children}
      </Check>
    );
  };
  node.propTypes = {
    className: React.PropTypes.string
  };
  return node;
}

const extendCheckArray = (node) => {
  const nodeArray = (props) => {
    return (
      <CheckArray node={node} {...props}/>
    );
  };
  return nodeArray;
}

export { Check, extendCheck, extendCheckArray };
