'use strict'

import React from 'react';
import rx from 'resplendence';

import TraumaSelector from './trauma-selector';
import Tickbars from './tickbars';

const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  justify-content: space-between;
  width: 100%;
`

const StressAndTrauma = (props) => {
  const { stress, trauma, disabled, stressBonus, traumaBonus } = props;
  const showTraumaSelector = stress >= 9 + stressBonus;
  const addTrauma = (trauma) => {
    return null;
  }
  return(
    <Container>
      <Tickbars trauma={trauma} stress={stress}
                stressBonus={stressBonus} traumaBonus={traumaBonus}
                disabled={disabled}/>
      <TraumaSelector trauma={trauma} off={disabled || !showTraumaSelector}/>
    </Container>
  );
}

const { number, array, bool } = React.PropTypes;
StressAndTrauma.propTypes = {
  stress: number.isRequired,
  trauma: array.isRequired,
  disabled: bool,
  stressBonus: number,
  traumaBonus: number,
}
StressAndTrauma.defaultProps = {
  stressBonus: 0,
  traumaBonus: 0
}

export default StressAndTrauma;
