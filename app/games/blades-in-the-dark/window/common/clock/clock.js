'use strict'

import React from 'react';
import styled, { css } from 'styled-components';
import cx from 'classnames';

import Mark from './mark';
import Divider from './divider';
import Center from './center';
import OuterBorder from './outer-border';
import InnerBorder from './inner-border';

import Colors from 'games/blades-in-the-dark/common/colors';
import rotate from './rotate'
import pointsToString from './points';
import stroke from './stroke-css';
import { lighten } from 'utils/color-tools';

const { sun, stone, textShadow, fire, sky } = Colors;

const TAU = Math.PI * 2;

const RANGES = {
  8: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  6: [0, 2, 4, 5, 6, 7, 8],
  4: [0, 4, 6, 7, 8]
}

const Svg = styled.svg`
  filter: drop-shadow(${textShadow});
`
const StyledFocus = styled.a`
  &:not(.disabled) {
    cursor: pointer;
    &:focus {
      outline: none;
      polygon.mark {
        &:not(.checked):first-child {
          fill: ${lighten(stone, 0.2)};
        }
        &.checked:last-child {
          fill: ${lighten(fire, 0.2)};
        }
      }
    }
  }
`
class Focus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(keepFocus) {
    const { onClick, disabled } = this.props;
    if (onClick && !disabled) {
      onClick();
      if (keepFocus !== true) {
        document.activeElement.blur();
      }
    }
  }
  handleKeyDown(e) {
    if (e.which == '32' || e.which == '13') {
      e.preventDefault()
      this.handleClick(true);
      return false;
    }
  }
  render() {
    const { onClick, disabled, ...rest } = this.props;
    var href = null;
    if (!disabled) {
      href = "javascript:undefined";
    }
    return (
      <StyledFocus href={href} {...rest} className={cx({disabled})}
                   onClick={this.handleClick}
                   onKeyDown={this.handleKeyDown}/>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
    }
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (!this.props.disabled && newProps.disabled) {
      this.setState({hover: null});
    }
  }
  mouseOver(value) {
    return () => {
      this.setState({hover: value});
    }
  }
  mouseLeave(value) {
    return () => {
      if (this.state.hover == value) {
        this.setState({hover: null});
      }
    }
  }
  handleContextMenu(e) {
    const { decrement, disabled } = this.props;
    if (!disabled && decrement) {
      decrement();
    }
    e.preventDefault();
    return false;
  }
  render() {
    const { className, value, size, disabled, increment, decrement, lock } = this.props;
    console.log('CLOCK', lock);
    const { hover, click } = this.state;
    const r = .5;
    const stroke = 0.1;
    let highlight = 0;
    if (hover != null) {
      if (hover < value && value > lock ) {
        highlight = -1;
      }
      else if (hover >= value || hover == 'mid') {
        highlight = 1;
      }
    }
    let marks = [];
    let uncheckedMarks = [];
    let dividers = [];
    for (let i=0; i < size; i++) {
      let start = RANGES[size][i];
      let end = RANGES[size][i + 1];
      let props = {
        start, end, r, stroke,
        key: i
      }
      if (!disabled) {
        props.onMouseOver = this.mouseOver(i);
        props.onMouseLeave = this.mouseLeave(i);
        if (value <= i) {
          props.onClick = increment;
        }
        else {
          props.onClick = decrement;
        }
        if (hover != null) {
          if (i < value && i == value + highlight) {
            props.highlight = true;
          }
          if (i >= value && i < value + highlight) {
            props.highlight = true;
          }
        }
        if (hover != null) {
        }
      }
      if (value > i) {
        marks.push(
          <Mark {...props} checked/>
        );
      }
      else {
        uncheckedMarks.push(
          <Mark {...props}/>
        )
      }
      dividers.push(
        <Divider key={i} className='stroke' n={start} stroke={stroke}/>
      )
    }
    const name = cx('clock', className);
    const outerPoints = [];
    const innerPoints = [];
    for (let i=0; i < 8; i++) {
      outerPoints.push(rotate([Math.tan(TAU / 16), -1], i));
      innerPoints.push(rotate([0, -r], i));
    }
    const width = 2 + stroke;
    const offset = -(width / 2);
    return (
      <Svg x="0px"
           y="0px"
           className={name}
           preserveAspectRatio="none"
           width="1.2em"
           height="1.2em"
           viewBox={`${offset} ${offset} ${width} ${width}`}
           onContextMenu={this.handleContextMenu}>
        <Focus onClick={decrement} disabled={disabled || value <= lock}>
          {marks}
        </Focus>
        <Focus onClick={increment} disabled={disabled}>
          {uncheckedMarks}
        </Focus>
        {dividers}
        <Center r={r} disabled={disabled}
                onMouseOver={disabled ? null : this.mouseOver('mid')}
                onMouseLeave={disabled ? null : this.mouseLeave('mid')}
                onClick={disabled ? null : increment}
                highlight={highlight}/>
   			<InnerBorder stroke={stroke} r={r}/>
        <OuterBorder stroke={stroke}/>
      </Svg>
    );
  }
}

Clock.propTypes = {
  value: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired
}

export default Clock
