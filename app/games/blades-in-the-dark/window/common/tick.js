'use strict'

import React from 'react';
import cx from 'classnames';

import { extendCheck } from 'games/blades-in-the-dark/window/common/check.js';

const svg = (
  <svg x="0px"
       y="0px"
       preserveAspectRatio="none"
       width=".5em"
       height="1.2em"
       viewBox="0 0 60 110">
     <polygon points="5,5 55,5 55,80 5,105" strokeWidth="10"/>
  </svg>
);

const { node, nodeArray } = extendCheck({name: 'tick', children: svg});
const Tick = node;
const TickArray = nodeArray;

export { Tick, TickArray };
