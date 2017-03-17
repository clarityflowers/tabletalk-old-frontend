'use strict'

import React from 'react';
import styled from 'styled-components';

import Stress from './stress';
import TraumaBar from './trauma-bar';

import { TickArray } from 'blades/window/common/tick';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  position: relative;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1 1 auto;
`


const Tickbars = (props) => {
  const { trauma, stress, disabled, stressBonus, traumaBonus } = props;
  return(
    <Container>
      <Stress stress={stress} disabled={disabled} bonus={stressBonus}/>
      <TraumaBar trauma={trauma} bonus={traumaBonus}/>
    </Container>
  );
}

const { number, array, bool } = React.PropTypes;
Tickbars.propTypes = {
  stress: number.isRequired,
  trauma: array.isRequired,
  disabled: bool,
  stressBonus: number,
  traumaBonus: number
}
Tickbars.defaultProps = {
  stressBonus: 0,
  traumaBonus: 0
}

export default Tickbars;
