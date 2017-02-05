'use strict'

import React from 'react';
import styled from 'styled-components';

import Stress from './stress';
import TraumaBar from './trauma-bar';

import { TickArray } from 'games/blades-in-the-dark/window/common/tick';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  position: relative;
  align-items: flex-start;
  justify-content: flex-end;
`


const Tickbars = (props) => {
  const { trauma, stress, disabled } = props;
  return(
    <Container>
      <Stress stress={stress} disabled={disabled}/>
      <TraumaBar trauma={trauma}/>
    </Container>
  );
}

Tickbars.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  disabled: React.PropTypes.bool
}

export default Tickbars;
