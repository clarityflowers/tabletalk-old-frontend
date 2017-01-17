'use strict'

import React from 'react';
import cx from 'classnames';

import './clock.scss';

const POINTS = [
  "48.021,24.282 43.042,19.303 36,19.303     36.001,26.561 42.89,29.415 ",
  "53,29.261     48.021,24.282 42.89,29.415  45.744,36.304 53,36.304",
  "53,43.345     53,36.303     45.744,36.304 42.89,43.192  48.021,48.324",
  "48.021,48.324 42.89,43.192  36.001,46.046 36,53.303     43.042,53.303",
  "28.959,53.303 36,53.303     36.001,46.046 29.113,43.192 23.979,48.324",
  "19,43.345     23.979,48.324 29.113,43.192 26.259,36.304 19,36.304",
  "19,36.304     26.259,36.304 29.113,29.415 24.056,24.359 19,29.261",
  "23.902,24.359 29.113,29.415 36.001,26.561 36.001,19.303 28.959,19.303"
];

const POINTS_8 = [
  [[48.021, 24.282], [43.042, 19.303], [36,19.303], [36, 26.561], [42.89,29.415]],
  [[53,29.261], [48.021,24.282], [42.89,29.415], [45.744,36.304], [53,36.304]],
  [[53,43.345], [53,36.303], [45.744,36.304], [42.89,43.192], [48.021,48.324]],
  [[48.021,48.324], [42.89,43.192], [36.001,46.046], [36,53.303], [43.042,53.303]],
  [[28.959,53.303], [36,53.303], [36.001,46.046], [29.113,43.192], [23.979,48.324]],
  [[19,43.345], [23.979,48.324], [29.113,43.192], [26.259,36.304], [19,36.304]],
  [[19,36.304], [26.259,36.304], [29.113,29.415], [24.056,24.359], [19,29.261]],
  [[23.902,24.359], [29.113,29.415], [36,26.561], [36,19.303], [28.959,19.303]]
];

const Mark = (props) => {
  const {
    points, checked, highlight,
    onClick, onMouseOver, onMouseLeave
  } = props;
  let pointsString = "";
  for (let i=0; i<points.length; i++) {
    const coords = points[i];
    pointsString += `${coords[0]},${coords[1]} `;
  }
  const className = cx('mark', {checked, highlight});
  return (
    <polygon className={className} points={points} onClick={onClick}
             onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}/>
  )
}

Mark.propTypes = {
  points: React.PropTypes.array.isRequired,
  checked: React.PropTypes.bool,
  highlight: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: null
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
    if (this.props.decrement) {
      this.props.decrement();
    }
    e.preventDefault();
    return false;
  }
  render() {
    const { value, size, disabled, increment, decrement } = this.props;
    const { hover, click } = this.state;
    let marks = [];
    for (let i=0; i < 8; i++) {
      let props = {
        key: i,
        points: POINTS_8[i]
      }
      if (value > i) {
        props.checked = true;
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
          if (i == value - 1 && (hover == 'mid' || hover < value)) {
            props.highlight = true;
          }
        }
        if (hover != null) {
          if (i == value && hover >= value) {
            props.highlight = true;
          }
        }
      }
      marks.push(
        <Mark {...props}/>
      );
    }
    const className = cx('clock', {disabled});
    return (
      <svg x="0px"
           y="0px"
           className={className}
           preserveAspectRatio="none"
           width="1.2em"
           height="1.2em"
           viewBox="18 18.303 36 36">
        {marks}
   			<line className='stroke' strokeWidth="2" x1="36" y1="18.303" x2="36" y2="53.697"/>
   			<line className='stroke' strokeWidth="2" x1="18" y1="36.303" x2="54" y2="36.303"/>
   			<line className='stroke' strokeWidth="2" x1="23.273" y1="23.576" x2="48.728" y2="49.031"/>
   			<line className='stroke' strokeWidth="2" x1="48.728" y1="23.576" x2="23.272" y2="49.031"/>
   			<polygon className='center'
                 points="42.89,29.415 36.001,26.561 29.113,29.415 26.259,36.304 29.113,43.192 36.001,46.046	42.89,43.192 45.744,36.304"
                 onClick={increment}
                 onContextMenu={this.handleContextMenu.bind(this)}/>
   			<polygon className='stroke' strokeWidth="4" points="42.89,29.415 36.001,26.561 29.113,29.415 26.259,36.304
   				29.113,43.192 36.001,46.046 42.89,43.192 45.744,36.304 			"/>

        <polygon className='stroke' fill="none" strokeWidth="2"
                 points="53,29.261 43.042,19.303 28.959,19.303 19,29.261 19,43.345
                         28.959,53.303 43.042,53.303 53,43.345"/>
      </svg>
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
