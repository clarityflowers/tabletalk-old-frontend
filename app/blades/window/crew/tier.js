'use strict'

import React from 'react';
import styled from 'styled-components';

import Label from 'blades/window/styles/label-button';
import Bar from 'blades/window/styles/bar';
import { DotArray } from 'blades/window/common/dot'
import StatusBar from './status-bar';
import TierMarks from 'blades/window/common/tier';

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
  margin: 0 .35em 0 .7em;
  &.highlight {
    color: ${sky};
  }
`
const Strong = styled(cz(Hold, 'highlight'))`
  color: ${mix(fire, stone, 0.7)};
  margin: 0 .7em 0 .35em;
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
const TierBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  height: 1.3em;
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
        <TierBar>
          <TierLabel disabled>
            TIER
          </TierLabel>
          <TierMarks value={tier}/>
        </TierBar>
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
