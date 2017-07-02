'use strict'

import React from 'react';
import rx from 'resplendence';

import Link from 'utils/link';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const TabLink = rx(Link)`--1
  font: $h1;
  color: $sun;
  background-color: $mud;
  text-decoration: none;
  box-shadow: $shadow;
  border-radius: .5em;
  padding: 0em .4em;
  margin: 0 .5em;
  &.disabled {
    color: $fire;
    background-color: $sun;
  }
  &:not(.disabled) {
    cursor: pointer;
    &:focus {
      outline: none;
      text-decoration: underline;
    }
    &:hover {
      background-color: $sand;
    }
    &:focus {
      color: $mud;
    }
  }
`

class TabButton extends React.Component {
  shouldComponentUpdate(newProps) {
    if (
      newProps.index !== this.props.index ||
      newProps.name !== this.props.name ||
      newProps.active !== this.props.active
    ) {
      return true;
    }
    return false;
  }
  render () {
    const { route, index, name, active } = this.props;
    return (
      <TabLink route={route} rx={{disabled: active}}>
        {name}
      </TabLink>
    )
  }
}

const { object, number, string, bool } = React.PropTypes;
TabButton.propTypes = {
  route: object.isRequired,
  index: number.isRequired,
  name: string.isRequired,
  active: bool.isRequired
}

export default TabButton;
