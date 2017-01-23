'use strict'

import React from 'react';
import cx from 'classnames';

import { extendCheck } from 'games/blades-in-the-dark/window/common/check.js';

import './dot.scss';

const result = extendCheck({name: 'dot', children: null});
const Dot = result.node;
const DotArray = result.nodeArray;

export { Dot, DotArray };
