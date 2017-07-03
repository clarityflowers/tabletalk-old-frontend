import React from 'react';
import rx from 'resplendence';

import Bandolier from './bandolier';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";
`

const Container = rx('div')`
  font: $body;
  color: $sun;
  padding-left: 3em;
`
const Header = rx('div')`
  font: $h1;
  color: $sand;
`
const Instructions = rx('div')`
  font-size: 0.8em;
  font-style: italic;
`
const Alchemicals = rx('ul')`
  font-size: 0.8em;
  margin: .5em 0;
  padding: 0 1.5em;
`;
const Alchemical = rx('li')`
  margin: .1em 0;
`

class Alchemy extends React.PureComponent {
  render() {
    const { bandolier1, bandolier2, count, disabled } = {bandolier1: 1, bandolier2: 3, count: this.props.count, disabled: false};
    const bandoliers = []
    return (
      <Container>
        <Header>Alchemy</Header>
        <Bandolier on={count > 0} used={bandolier1} disabled={disabled} id="1"/>
        <Bandolier on={count > 1} used={bandolier2} disabled={disabled} id="2"/>
        <Instructions>
          When you use a bandolier slot, choose an alchemical:
        </Instructions>
        <Alchemicals>
          <Alchemical>Alcahest</Alchemical>
          <Alchemical>Binding Oil</Alchemical>
          <Alchemical>Drift Oil</Alchemical>
          <Alchemical>Drown Powder</Alchemical>
          <Alchemical>Eyeblind Poison</Alchemical>
          <Alchemical>Fire Oil</Alchemical>
          <Alchemical>Grenade</Alchemical>
          <Alchemical>Quicksilver</Alchemical>
          <Alchemical>Skullfire Poison</Alchemical>
          <Alchemical>Smoke Bomb</Alchemical>
          <Alchemical>Spark (drug)</Alchemical>
          <Alchemical>Standstill Poison</Alchemical>
          <Alchemical>Trance Powder</Alchemical>
        </Alchemicals>
      </Container>
    )
  }
}

const { number, bool } = React.PropTypes;
Alchemy.propTypes = {
  bandolier1: number.isRequired,
  bandolier2: number.isRequired,
  count: number.isRequired,
  disabled: bool.isRequired
}

export default Alchemy;
