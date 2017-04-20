import React from 'react';
import styled from 'styled-components'

import Bandolier from './bandolier';

const Container = styled.div`
  padding-left: 1em;
`
const Header = styled.div`

`

class Alchemy extends React.PureComponent {
  render() {
    const { bandolier1, bandolier2, count, disabled } = {bandolier1: 1, bandolier2: 3, count: this.props.count, disabled: false};
    const bandoliers = []
    return (
      <Container>
        <Header>Alchemy</Header>
        <Bandolier on={count > 0} used={bandolier1} disabled={disabled} id={1}/>
        <Bandolier on={count > 1} used={bandolier2} disabled={disabled} id={2}/>
      </Container>
    )
  }
}

export default Alchemy;
