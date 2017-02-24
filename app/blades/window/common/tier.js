'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import props from 'utils/props';

const { sand, shadow } = Colors;

const Mark = styled.div`
  width: .4em;
  height: 100%;
  background: ${sand};
  margin-left: .2em;
  box-shadow: ${shadow};
`
const Container = styled(props('div', 'max'))`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-self: stretch;
  width: ${p => p.max * 0.6}em;
`

class Tier extends React.PureComponent {
  render() {
    const { value, max } = this.props;
    const marks = [];
    for (let i=0; i < value; i++) {
      marks.push(<Mark key={i}/>);
    }
    return (
      <Container max={max}>
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
