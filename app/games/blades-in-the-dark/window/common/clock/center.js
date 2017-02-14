'use strict'

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import rotate from './rotate'
import pointsToString from './points';

import Colors from 'games/blades-in-the-dark/common/colors';
import { lighten, darken } from 'utils/color-tools';

const { stone, fire, sun, sky } = Colors;
const fill = lighten(stone, 0.1);
const plus = sky;
const minus = fire;

const TAU = Math.PI * 2;

const Polygon = styled.polygon`
  fill: ${fill};
  &.plus {
    fill: ${plus};
  }
  &.minus {
    fill: ${minus};
  }
  &:not(.disabled) {
    cursor: pointer;
  }
`

class Center extends React.PureComponent {
  render() {
    const { r, highlight, disabled, ...rest } = this.props;
    let points = [];
    for (let i=0; i < 8; i++) {
      points.push(rotate([0, -r], i));
    }
    const className=cx('center', {
      plus: highlight > 0,
      minus: highlight < 0,
      disabled
    });
    return (
      <Polygon className={className}
               points={pointsToString(points)}
               {...rest}/>
    )
  }
}

export default Center;
