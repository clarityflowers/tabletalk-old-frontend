'use strict'

import React from 'react';
import cx from 'classnames';

import './check.scss';

const Check = (props) => {
  const {
    className, checked,
    onClick, onHover,
    value, highlight, disabled,
    isButton
  } = props;
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
  const buttonClassName = cx(
    className, 'check', {
      checked: checked,
      highlight: highlight
    }
  );
  let properties = Object.assign({}, props);
  delete properties.checked;
  delete properties.className;
  delete properties.highlight;
  delete properties.onClick;
  delete properties.onHover;
  delete properties.value;
  delete properties.isButton;
  let result = null;
  if (isButton) {
    result = (
      <button className={buttonClassName}
              onClick={handleClick.bind(this)}
              onMouseOver={handleMouseOver.bind(this)}
              onMouseLeave={handleMouseLeave.bind(this)}
              {...properties}>
        {props.children}
      </button>
    );
  }
  else {
    result = (
      <div className={buttonClassName} {...properties}/>
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
    increment, decrement
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
        <button onClick={decrement} {...checkedProps} {...properties}>
          <div className='container'>
            {checkedArray}
          </div>
        </button>
      );
    }
    if (uncheckedArray.length > 0) {
      uncheckedArray = (
        <button onClick={increment} {...uncheckedProps} {...properties}>
          <div className='container'>
            {uncheckedArray}
          </div>
        </button>
      );
    }
  }
  let properties = Object.assign({}, props);
  delete properties.value;
  delete properties.offset;
  delete properties.length;
  delete properties.node;
  delete properties.className;
  delete properties.nodeClassName;
  delete properties.highlight;
  delete properties.checkedProps;
  delete properties.uncheckedProps;
  delete properties.isButton;
  delete properties.onHover;
  properties.className = nodeClassName;
  const containerClassName = cx('check-array', className);
  return (
    <div className={containerClassName}>
      {checkedArray}
      {uncheckedArray}
    </div>
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

  const nodeArray = (props) => {
    return (
      <CheckArray node={node} {...props}/>
    );
  };

  return {node, nodeArray};
}

export { Check, CheckArray, extendCheck };
