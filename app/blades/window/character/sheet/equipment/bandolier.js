import React from 'react';
import styled from 'styled-components'

import { CoinArray } from 'blades/window/common/coin';

const Container = styled.div`
`
const Label = styled.div`

`

class Bandolier extends React.PureComponent {
  render() {
    const { on, used, id, disabled } = this.props;
    return (
      <Container>
        <Label>Bandolier</Label>
        <CoinArray value={used} length={3} disabled={disabled || !on}/>
      </Container>
    )
  }
}

export default Bandolier;
