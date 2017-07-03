'use strict'

import React from 'react';
import rx from 'resplendence';

rx`
@import "~blades/window/styles/label";
`
const Label = rx('div')`
  @include label;
`

export default Label
