'use strict'

import React from 'react';
import rx from 'resplendence';

import CommonButton from 'common/button';

import connect from 'utils/connect';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Button = rx(CommonButton)`
  $normal: lighten($stone, 30%);
  $normal-used: lighten($normal, 20%);
  $light: $sky;
  $light-used: lighten($light, 10%);
  $heavy: fade-out($sand, 0.4);
  $heavy-used: fade-in($heavy, 0.3);
  $huge: fade-out($fire, 0.1);
  $huge-used: fade-in($huge, 0.3);
  font: $body;
  text-align: left;
  font: $body;
  color: $normal;
  margin: 0 1em .2em 0;
  &.heavy {
    color: $heavy;
  }
  &.huge {
    color: $huge
  }
  &.light {
    color: $light;
  }
  &.used {
    font-weight: 700;
    color: $normal-used;
    &.heavy {
      color: $heavy-used;
    }
    &.huge {
      color: $huge-used;
    }
    &.light {
      color: $light-used;
    }
  }
  &:not(:disabled) {
    cursor: pointer;
    $hover: lighten($fire, 10%);
    &:active {
      color: lighten(mix($normal-used, $hover, 20%), 20%);
    }
    &.heavy {
      &:active {
        color: lighten(mix($heavy-used, $hover, 20%), 20%);
      }
    }
    &.light {
      &:active {
        color: lighten(mix($light-used, $hover, 20%), 20%);
      }
    }
    @media only screen and (max-width: 900px) {
      &:hover, &:focus {
        text-decoration: underline;
      }
    }
    @media only screen and (min-width: 901px) {
      &:focus {
        text-decoration: underline;
        outline: none;
      }
      &:hover {
        color: mix($normal-used, $hover, 40%);
      }
      &.heavy {
        &:hover {
          color: mix($heavy-used, $hover, 50%);
        }
      }
    }
    &.light {
      &:hover {
        color: mix($light-used, $hover, 50%);
      }
    }
  }
`

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { dispatch, name, used } = this.props;
    if (used) {
      dispatch('clear_item', name);
    }
    else {
      dispatch('use_item', name);
    }
  }
  render() {
    const { name, load, used, disabled } = this.props;
    return (
      <Button disabled={disabled} onClick={this.handleClick}
              rx={{used, heavy: load == 2, huge: load > 2, light: load < 1}}>
        {name}
      </Button>
    )
  }
}

const { string, number, bool, func } = React.PropTypes;
Item.propTypes = {
  name: string.isRequired,
  load: number.isRequired,
  used: bool.isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired
}

export default connect(Item);
