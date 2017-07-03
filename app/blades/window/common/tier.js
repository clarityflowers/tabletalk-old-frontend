'use strict'

import React from 'react';
import rx from 'resplendence';

import inlined from 'utils/inlined';

rx`
@import "~blades/common/colors";
`

const Mark = rx('div')`
  width: .4em;
  height: 100%;
  background: $sand;
  margin-left: .2em;
  box-shadow: $shadow;
`
const RxContainer = rx('div')`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-self: stretch;
`
const Container = inlined(rx('div')`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-self: stretch;
`, (max) => { 
  return {width: `${max * 0.6}em`}
});

class Tier extends React.PureComponent {
  render() {
    const { value, max } = this.props;
    const marks = [];
    for (let i=0; i < value; i++) {
      marks.push(<Mark key={i}/>);
    }
    return (
      <Container style={max}>
        {marks}
      </Container>
    )
  }
}

const { number } = React.PropTypes;
Tier.propTypes = {
  value: number.isRequired,
  max: number
}
Tier.defaultProps = {
  max: 4
}

export default Tier;
