'use strict'

import React from 'react';
import styled from 'styled-components';

import TraumaSelector from './trauma-selector';
import Tickbars from './tickbars';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const StressAndTrauma = (props) => {
  const { stress, trauma, disabled } = props;
  const showTraumaSelector = stress == 9;
  const addTrauma = (trauma) => {
    return null;
  }
  return(
    <Container>
      <TraumaSelector trauma={trauma} off={disabled || !showTraumaSelector}/>
    </Container>
  );
}

StressAndTrauma.propTypes = {
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  disabled: React.PropTypes.bool
}

export default StressAndTrauma;
