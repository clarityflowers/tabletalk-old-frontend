'use strict'

import { extendCheck } from 'games/blades-in-the-dark/character/check.js';

import './checkbox.scss';

const { node, nodeArray } = extendCheck({name: 'checkbox'});

const Checkbox = node;
const CheckboxArray = nodeArray;

export { Checkbox, CheckboxArray };
