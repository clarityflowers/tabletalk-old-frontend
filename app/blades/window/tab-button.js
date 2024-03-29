'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts'
import Link from 'utils/link';
import cz from 'utils/styled-classes';

const TabLink = styled(cz(Link, 'active'))`
  font: ${Fonts.h1};
  color: $sun;
  background-color: ${Colors.mud};
  text-decoration: none;
  box-shadow: ${Colors.shadow};
  border-radius: .5em;
  padding: 0em .4em;
  margin: 0 .5em;
  &.disabled {
    color: ${Colors.fire};
    background-color: ${Colors.sun};
  }
  &:not(.disabled) {
    cursor: pointer;
    &:focus {
      outline: none;
      text-decoration: underline;
    }
    &:hover {
      background-color: ${Colors.sand};
    }
    &:focus {
      color: ${Colors.mud};
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
      <TabLink route={route} disabled={active}>
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
