'use strict'

import React from 'react';
import styled from 'styled-components';

import Label from 'blades/window/styles/label';
import Bar from 'blades/window/styles/bar';
import { DotArray } from 'blades/window/common/dot'
import StatusBar from './status-bar';

import Fonts from 'blades/common/fonts';
import Colors from 'blades/common/colors';
import { mix, desaturate } from 'utils/color-tools';

const { stone, fire, sky, textShadow } = Colors;
const { h1 } = Fonts;

import cz from 'utils/styled-classes';

const HoldBar = styled(Bar)`
  padding-top: .5em;
`
const Hold = styled.div`
  font: ${h1};
  text-shadow: ${textShadow};
  user-select: none;
  cursor: default;
`
const Weak = styled(cz(Hold, 'highlight'))`
  color: ${mix(sky, stone, 0.7)};
  margin: 0 .25em 0 .5em;
  &.highlight {
    color: ${sky};
  }
`
const Strong = styled(cz(Hold, 'highlight'))`
  color: ${mix(fire, stone, 0.7)};
  margin: 0 .5em 0 .25em;
  &.highlight {
    color: ${fire};
  }
`
const TierLabel = styled(Label)`
  z-index: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const Array = styled(DotArray)`
  margin-left: 0.2em;
  .check {
    margin: 0 0.2em;
  }
`

class Tier extends React.PureComponent {
  render () {
    const { tier, strong } = this.props;
    return (
      <StatusBar>
        <Label disabled>
          HOLD
        </Label>
        <HoldBar>
          <Weak highlight={!strong}>
            WEAK
          </Weak>
          <Strong highlight={strong}>
            STRONG
          </Strong>
        </HoldBar>
        <TierLabel disabled>
          TIER
          <Array value={tier} length={4} isButton={false}/>
        </TierLabel>
      </StatusBar>
    )
  }
}

const { number, bool } = React.PropTypes;
Tier.propTypes = {
  tier: number.isRequired,
  strong: bool.isRequired
}

export default Tier;
