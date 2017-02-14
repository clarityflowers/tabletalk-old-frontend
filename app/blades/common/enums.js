'use strict'

import { ACTIONS } from 'common/enums.js';

ACTIONS.ROLL = 'roll';
ACTIONS.UPDATE = 'update';
ACTIONS.LOG = 'log';
ACTIONS.DO = 'do';

const TAB_TYPES = {
  CHARACTER: 0,
  CREW: 1
}

export { ACTIONS, TAB_TYPES };
