import { lighten, darken, fadeout } from 'utils/color-tools';

const Colors = {
  stone: `hsla(0, 0%, 24%, 1)`,
  sand:  `hsla(32, 78%, 72%, 1)`,
  fire:  `hsla(3, 56%, 54%, 1)`,
  sky:   `hsla(171, 20%, 54%, 1)`,
  mud:   `hsla(26, 25%, 39%, 1)`
}

Colors.sun = lighten(Colors.sand, 0.2), 0;
Colors.shadowColor = fadeout(darken(Colors.stone, 0.50), .6);
Colors.shadow = `-3px 2px 2px 1px ${Colors.shadowColor}`;
Colors.textShadow = `-2px 2px 1px ${Colors.shadowColor}`;


export default Colors;
