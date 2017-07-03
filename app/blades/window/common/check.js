'use strict'

import React from 'react';
import cx from 'classnames';

import Row from 'common/row';
import Button from 'common/button';

import filter from 'utils/filter';

class Check extends React.PureComponent {
  render() {
    const {
      className, checked, children,
      onClick, onHover,
      value, highlight,
      isButton, ...buttonProps
    } = this.props;
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
          {children}
        </Button>
      );
    }
    else {
      result = (
        <div className={buttonClassName} {...buttonProps}>
          {children}
        </div>
      );
    }
    return result;
  }
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

const extendCheck = (children) => {
  const node = (props) => {
    return (
      <Check {...props} children={children}>
      </Check>
    );
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
