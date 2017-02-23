import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import rotate from './rotate'
import pointsToString from './points';
import Colors from 'blades/common/colors';
import { lighten, darken } from 'utils/color-tools';

const { fire, stone } = Colors;

const TAU = Math.PI * 2;

const Polygon = styled.polygon`
  stroke: none;
`

const Mark = (props) => {
  const {
    start, end, checked, highlight,
    onClick, onMouseOver, onMouseLeave, r
  } = props;
  const corner = [Math.tan(TAU / 16), -1];
  let points = [];
  points.push(rotate([0, -1], start));
  for (let i=start; i < end; i++) {
    points.push(rotate(corner, i));
  }
  points.push(rotate([0, -1], end));
  points.push(rotate([0, -r], end));
  for (let i=end - 1; i >= start; i--) {
    points.push(rotate([0, -r], i));
  }

  const className = cx('mark', {checked, highlight});
  return (
    <Polygon className={className} points={pointsToString(points)}
             onClick={onClick}
             onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}/>
  )
}

const { number, bool, func } = React.PropTypes
Mark.propTypes = {
  start: number.isRequired,
  end: number.isRequired,
  highlight: bool,
  onClick: func,
  checked: bool,
  r: number.isRequired,
  onMouseOver: func,
  onMouseLeave: func,
}

export default Mark;
