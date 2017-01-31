'use strict'

import { lighten, darken, fadeout } from 'utils/color-tools';

const Colors = {
  confetti: `hsla(2, 94%, 80%, 1)`,
  hearts:   `hsla(349, 99%, 63%, 1)`,
  balloons: `hsla(153, 22%, 60%, 1)`
}

Colors.shadowColor = fadeout(darken(Colors.confetti, 0.6), 0.6);
Colors.boxShadow = `-2px 2px 2px 1px ${Colors.shadowColor}`;
Colors.borderShadow = `${Colors.boxShadow} inset`;
Colors.textShadow = `-2px 2px 2px ${Colors.shadowColor}`;
Colors.heartsLight = lighten(Colors.hearts, 0.35);

Colors.details = {
  background: lighten(Colors.balloons, 0.3),
  color: darken(Colors.balloons, 0.3),
  middleground: darken(Colors.balloons, 0.1),
}
Colors.details.shadow = fadeout(darken(Colors.details.color, 0.7), 0.5);

export default Colors;
