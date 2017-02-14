'use strict'

import React from 'react';
import styled, { css } from 'styled-components';

import stroke from './stroke-css';
import rotate from './rotate';

const Line = styled.line`
  ${stroke}
`

class Divider extends React.PureComponent {
  render() {
    const { n, stroke } = this.props;
    const p = rotate([0, -1], n);
    return (
      <Line className='stroke' strokeWidth={stroke} x1={p[0]} y1={p[1]} x2={0} y2={0}/>
    )
  }
}

export default Divider;
