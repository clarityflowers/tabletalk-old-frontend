'use strict'

import React from 'react';
import styled from 'styled-components';

import Trauma from './trauma';

import cz from 'utils/styled-classes';

const Container = styled(cz('div', 'off'))`
  font-size: .8em;
  flex: 0 0 auto;
  height: 2.5em;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;;
  align-items: center;
  transition-property: height, top;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(.5, -.5, .5, 1.5);
  margin-bottom: .5em;
  position: relative;
  top: 0;
  &.off {
    height: .1em;
    top: 1em;
  }
`

class TraumaSelector extends React.PureComponent {
  add() {
    const { dispatch } = this.props;
    dispatch('add_trauma', )
  }
  render() {
    const { trauma, off, props } = this.props;
    const click = (name) => {
      return () => {
        add(name);
      };
    }
    let traumaList = [
      'Cold', 'Haunted', 'Obsessed',
      'Paranoid', 'Reckless', 'Soft',
      'Unstable', 'Vicious'
    ]
    let traumas = [];
    for (let i=0; i < traumaList.length; i++) {
      let show = true;
      for (let j=0; j < trauma.length; j++ ) {
        if (traumaList[i].toUpperCase() == trauma[j].toUpperCase()) {
          show = false;
        }
      }
      if (show) {
        traumas.push(
          <Trauma key={i} disabled={off} name={traumaList[i].toUpperCase()}/>
        );
      }
    }
    return (
      <Container off={off}>
        {traumas}
      </Container>
    );
  }
}

const { array, func, bool } = React.PropTypes;
TraumaSelector.propTypes = {
  trauma: array.isRequired,
  off: bool.isRequired
}

export default TraumaSelector;
