'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/common/colors";
`

const Bar = rx('div')`
  margin-bottom: .5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  position: relative;
  &:after {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: .5em;
    background: $sun;
    box-shadow: $shadow;
  }
`

export default Bar;
