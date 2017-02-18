import styled from 'styled-components';
import TickArray from 'blades/window/styles/tick-array';

import Colors from 'blades/common/colors';
import { darken } from 'utils/color-tools';

const { stone, sun } = Colors;
const dark = darken(stone, 0.1);

const ThickTickArray = styled(TickArray)`
  z-index: 2;
  position: relative;
  .check {
    svg polygon {
      fill: ${dark};
      stroke: ${dark};
    }
    &.checked svg {
      polygon {
        stroke: ${sun};
        fill: ${sun};
      }
    }
  }
`

export default ThickTickArray;
