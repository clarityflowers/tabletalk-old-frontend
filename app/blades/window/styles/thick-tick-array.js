import rx from 'resplendence';
import TickArray from 'blades/window/styles/tick-array';

rx`
@import "~blades/common/colors";
`

const ThickTickArray = rx(TickArray)`--1
  $dark: darken($stone, 10%);
  z-index: 2;
  position: relative;
  .check {
    svg polygon {
      fill: $dark;
      stroke: $dark;
    }
    &.checked svg {
      polygon {
        stroke: $sun;
        fill: $sun;
      }
    }
  }
`

export default ThickTickArray;
