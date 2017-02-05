'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'games/blades-in-the-dark/common/colors';

const { shadow, sun } = Colors;

const Bar = styled.div`
  margin-bottom: .5em;

  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  position: relative;
  &:after {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: .5em;
    background: ${sun};
    box-shadow: ${shadow};
  }
`

export default Bar;
