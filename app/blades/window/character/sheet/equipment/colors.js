import Colors from 'blades/common/colors';
import { lighten, darken } from 'utils/color-tools';

const { fire, stone, sun, shadowColor, shadow, textShadow } = Colors;

export const background = ({over}) => {
  if (over) {
    return fire;
  }
  else {
    return sun;
  }
}

export const color = ({over}) => {
  if (over) {
    return sun;
  }
  else {
    return stone;
  }
}

export const hover = ({over}) => {
  if (over) {
    return lighten(fire, 0.2);
  }
  else {
    return fire;
  }
}

export const active = ({over}) => {
  return lighten(hover({over}), 0.3);
}

export const dark = darken(stone, 0.2);

export { shadow, shadowColor, textShadow };
