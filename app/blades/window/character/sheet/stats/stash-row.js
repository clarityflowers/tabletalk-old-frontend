'use strict'

import React from 'react';
import rx from 'resplendence';

import Row from 'common/row';
import { CoinArray } from 'blades/window/common/coin';

rx`
@import "~blades/common/colors";
`

const StashArray = rx(CoinArray)`--1
  height: 1em;
  .check:not(:last-child) {
    background: darken($stone, 5%);
    &.highlight {
      background: darken($sky, 20%);
    }
    &.checked {
      background: $sky;
      &.highlight {
        background: $fire;
      }
    }
  }
`

const StashRow = (props) => {
  const {
    value, offset, highlight,
    checkedProps, uncheckedProps, ...rest
  } = props;
  const checked = value >= 10 + offset;
  let checkboxProps = checked ? checkedProps : uncheckedProps;
  let checkboxHighlight = (
    (checked && (value + highlight < 10 + offset)) ||
    (!checked && (value + highlight >= 10 + offset))
  );
  return (
      <StashArray value={value}
                  offset={offset}
                  length={10}
                  highlight={highlight}
                  checkedProps={checkedProps}
                  uncheckedProps={uncheckedProps}
                  isButton={false}
                  {...rest}/>
  );
}

StashRow.propTypes = {
  value: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired
}

StashRow.defaultProps = {
  disabled: false
}

export default StashRow;
