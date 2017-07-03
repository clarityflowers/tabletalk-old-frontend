'use strict'

import rx from 'resplendence';

import Link from 'utils/link';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const NewAbilityLink = rx(Link)`
  font: $h1;
  align-self: center;
  color: darken($stone, 10%);
  transition: color .15s, $textShadow .15s;
  margin-top: .5em;
  font-size: 1.25em;
  user-select: none;
  &:not(.disabled) {
    text-shadow: $textShadow;
    color: $sand;
    &:hover {
      color: $fire;
    }
    &:active {
      color: lighten($fire, 30%);
    }
  }
  &.disabled {
    cursor: default;
  }
`

export default NewAbilityLink;
