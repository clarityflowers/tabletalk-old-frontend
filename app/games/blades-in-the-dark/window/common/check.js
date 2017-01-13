'use strict'

import React from 'react';
import cx from 'classnames';

import './check.scss';

const Check = (props) => {
  const { className, checked, onClick, onHover, value, highlight, disabled } = props;
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
  return (
    <button className={buttonClassName}
            onClick={handleClick.bind(this)}
            onMouseOver={handleMouseOver.bind(this)}
            onMouseLeave={handleMouseLeave.bind(this)}
            {...properties}>
      {props.children}
    </button>
  )
}

Check.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onHover: React.PropTypes.func,
  value: React.PropTypes.number,
  highlight: React.PropTypes.bool
}

Check.defaultProps = {
  checked: false,
  className: null,
  onClick: null,
  onHover: null,
  value: null,
  highlight: null
}

const CheckArray = (props) => {
  const {
    value, offset, length, node,
    className, nodeClassName,
    highlight, checkedProps, uncheckedProps
  } = props;
  const Node = node;
  let array = [];
  let i=offset;
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
  properties.className = nodeClassName;
  while (i < value && i < length + offset) {
    let className = cx(
      nodeClassName, {
        highlight: i >= value + highlight,
      }
    );
    array.push(
      <Node key={i}
            value={i+1}
            checked
            highlight={i >= value + highlight}
            {...properties}
            {...checkedProps}/>
    )
    i++;
  }
  while (i < length + offset) {
    array.push(
      <Node key={i}
            value={i+1}
            highlight={i < value + highlight}
            {...properties}
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
  offset: React.PropTypes.number,
  length: React.PropTypes.number.isRequired,
  node: React.PropTypes.any.isRequired,
  className: React.PropTypes.string,
  nodeClassName: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  checkedProps: React.PropTypes.object,
  uncheckedProps: React.PropTypes.object,
  onClick: React.PropTypes.func,
  onHover: React.PropTypes.func
}

CheckArray.defaultProps = {
  disabled: false,
  highlight: 0,
  offset: 0
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
