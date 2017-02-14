'use strict'

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Row from 'common/row';
import { CoinArray } from './coin';
import Colors from 'blades/common/colors';
import { darken } from 'utils/color-tools';

const StashArray = styled(CoinArray)`
  height: 1em;
  .check:not(:last-child) {
    background: ${darken(Colors.stone, 0.05)};
    &.highlight {
      background: ${darken(Colors.sky, 0.2)};
    }
    &.checked {
      background: ${Colors.sky};
      &.highlight {
        background: ${Colors.fire};
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
