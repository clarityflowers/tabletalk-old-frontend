'use strict';

import React from 'react';
import styled from 'styled-components';

import Link from './link';
import Label from './label';
import Icon from './icon';

import cz from 'utils/styled-classes';

const Existing = (props) => {
  const {
    position, entering, leaving, transition, disabled,
    gameId, type, name, route, selected
  } = props;
  let iconPosition = Math.min(position, 3);
  let boxPosition = Math.max(position - 3, 0);
  const off = position == 0;
  return (
    <Link off={position == 0} disabled={selected} route={route.push(gameId)}>
      <Icon position={iconPosition}
            entering={entering}
            leaving={leaving}
            type={type}/>
      <Label name={name}
             position={boxPosition}
             transition={props.transition}/>
    </Link>
  );
}

const { number, bool, string, object } = React.PropTypes;
Existing.propTypes = {
  position: number.isRequired,
  entering: bool.isRequired,
  leaving: bool.isRequired,
  transition: bool.isRequired,
  selected: bool.isRequired,
  gameId: string.isRequired,
  type: number,
  name: string.isRequired,
  route: object.isRequired
}

export default Existing;
