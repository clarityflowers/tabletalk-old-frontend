'use strict'

import React from 'react';
import styled from 'styled-components';

import Bar from './bar';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';

const { sky, textShadow } = Colors;

const Container = styled(Bar)`
  padding: .75em 0 0 .4em;
  flex: 100 1 0;
  justify-content: flex-start;
  z-index: 0;
  height: auto;
`

const Trauma = styled.div`
  font: ${Fonts.h1};
  margin: 0 .5em;
  font-size: 0.8em;
  color: ${sky};
  text-shadow: ${textShadow};
`

const TraumaList = (props) => {
  const { trauma } = props;
  let traumas = [];
  for (let i=0; i<trauma.length; i++) {
    traumas.push(
      <Trauma key={i}>
        {trauma[i].toUpperCase()}
      </Trauma>
    )
  }
  return (
    <Container>
      {traumas}
    </Container>
  );
}

TraumaList.propTypes = {
  trauma: React.PropTypes.array.isRequired
}

export default TraumaList;
