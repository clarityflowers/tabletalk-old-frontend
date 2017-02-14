'use strict';

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import cz from 'utils/styled-classes';

import Colors from 'common/colors';
import AdventureColors from 'adventure/colors';
import BladesColors from 'blades/common/colors';
import { GameTypes } from 'utils/enums';
import { fadeout } from 'utils/color-tools';

const { hearts, heartsLight, boxShadow, borderShadow } = Colors;

const classes = ['off', 'dot', 'entering', 'leaving', 'closed'];
const StyledIcon = styled(cz('div', classes))`
  pointer-events: auto;
  position: absolute;
  left: 0em;
  top: -1.5em;
  width: 6em;
  height: 6em;
  border: 1em solid ${hearts};
  border-radius: 1500vh;
  box-shadow: ${boxShadow}, ${borderShadow};
  display: inline-block;
  flex: none;
  z-index: 2;
  transition-property: left, width, height, top, margin, border-width;
  transition-duration: .7s;
  transition-timing-function: cubic-bezier(0.730, -0.300, 0.375, 1.360);
  /*overflow: hidden;*/
  &.off, &.dot {
    margin: 3em;
    width: 0;
    height: 0;
  }
  &.closed:not(.dot) {
    width: 0;
    height: 0;
    border-width: 4em;
  }
  &.off {
    left: -50vw;
  }
  &.off, &.dot.entering {
    box-shadow: $box-shadow;
    background-color: $hearts;
    background-image: none;
  }
`
const Contents = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  box-shadow: ${borderShadow};
  border-radius: 1500vh;
`
const Adventure = styled(Contents)`
  ${AdventureColors.stripesBackground(0.8, 0.8, 0.2, 20)}
`
const sun = fadeout(BladesColors.sun, 0);
const Blades = styled(Contents)`
  background: linear-gradient(to top,
    transparent 0, transparent 35%,
    black 49%,
    ${sun} 50%);
  background-color: ${BladesColors.stone};
`

class Icon extends React.PureComponent {
  render() {
    const { position, entering, leaving, type } = this.props;
    let content = null;
    const gameType = GameTypes[type];
    if (gameType) {
      const name = gameType.name;
      if (name == 'World of Adventure') {
        content = (<Adventure/>);
      }
      else if (name == 'Blades in the Dark') {
        content = (<Blades/>);
      }
    }
    return (
      <StyledIcon className='icon' off={position == 0} dot={position == 1}
                  entering={entering} leaving={leaving}
                  closed={type == null}>
        {content}
      </StyledIcon>
    );
  }
}

const { bool, number } = React.PropTypes;
Icon.propTypes = {
  position: number.isRequired,
  entering: bool,
  leaving: bool,
  type: number
}

export default Icon;
