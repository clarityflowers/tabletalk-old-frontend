'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts'
import Link from 'utils/link';

const TabLink = styled(Link)`
  font: ${Fonts.h1};
  color: $sun;
  background-color: ${Colors.mud};
  text-decoration: none;
  box-shadow: ${Colors.shadow};
  border-radius: .5em;
  padding: 0em .4em;
  margin: 0 .5em;
`
const ActiveTab = styled(TabLink)`
  color: ${Colors.fire};
  background-color: ${Colors.sun};
`
const InactiveTab = styled(TabLink)`
  cursor: pointer;
  &:hover {
    background-color: ${Colors.sand};
  }
  &:focus {
    color: ${Colors.mud};
  }
`

const Tab = (props) => {
  const { route, index, name } = props;
  const active = parseInt(route.nextName) == index;
  const Node = active ? ActiveTab : InactiveTab;
  return (
    <Node route={route.push(index)}>
      {name}
    </Node>
  )
}

Tab.propTypes = {
  route: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired
}

export default Tab;
