'use strict'

import React from 'react';
import styled from 'styled-components';

import Border from './border';

import rotate from './rotate'
import pointsToString from './points';

const TAU = Math.PI * 2;

class InnerBorder extends React.PureComponent {
  render() {
    const { stroke, r } = this.props;
    const points = [];
    for (let i=0; i < 8; i++) {
      points.push(rotate([0, -r], i));
    }
    return (
      <Border className="stroke" points={pointsToString(points)}
              strokeWidth={stroke * 2} fill="none"/>
    );
  }
}

export default InnerBorder;
