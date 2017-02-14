import Colors from 'blades/common/colors';
import { lighten, darken } from 'utils/color-tools';

const { stone, fire, sun } = Colors;
const dark = darken(stone, 0.1);
const darkText = lighten(stone, 0.2);
const highlight = darken(fire, 0.2);
const highlightText = sun;

export default { dark, darkText, highlight, highlightText };
