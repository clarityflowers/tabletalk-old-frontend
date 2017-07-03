'use strict'

import React from 'react';
import rx from 'resplendence';

import Bar from 'blades/window/styles/bar';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  padding: .75em 0 0 .4em;
  flex: 100 1 0;
  justify-content: flex-start;
  z-index: 0;
  height: auto;
`

const Trauma = rx('div')`
  font: $h1;
  margin: 0 .5em;
  font-size: 0.8em;
  color: $sky;
  text-shadow: $textShadow;
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
