'use strict'

import React from 'react';
import styled from 'styled-components';

import Border from './border';

import rotate from './rotate'
import pointsToString from './points';

const TAU = Math.PI * 2;


class OuterBorder extends React.PureComponent {
  render() {
    const { stroke } = this.props;
    const points = [];
    for (let i=0; i < 8; i++) {
      points.push(rotate([Math.tan(TAU / 16), -1], i));
    }
    return (
      <Border className="stroke" points={pointsToString(points)}
              strokeWidth={stroke} fill="none"/>
    );
  }
}

export default OuterBorder;
