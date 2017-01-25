'use strict'

import { lighten, darken, fadeout } from 'utils/color-tools';

const Colors = {
  confetti: `hsla(2, 94%, 80%, 1)`,
  hearts:   `hsla(349, 99%, 63%, 1)`
}

Colors.shadowColor = fadeout(darken(Colors.confetti, 0.6), 0.6);
Colors.boxShadow = `-2px 2px 2px 1px ${Colors.shadowColor}`;
Colors.textShadow = `-2px 2px 2px ${Colors.shadowColor}`;

export default Colors;
