import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Colors from 'common/colors';
import Fonts from 'common/fonts';
import { GameTypes } from 'utils/enums';
import { HoverBuzz } from 'utils/hover-animate';
import Button from 'common/button';
import { fadeout, darken } from 'utils/color-tools';

import AdventureColors from 'adventure/colors';
import AdventureFonts from 'adventure/fonts';

import BladesColors from 'blades/common/colors';
import BladesFonts from 'blades/common/fonts';

const TypeButton = styled(Button)`
  width: 100%;
  margin-bottom: 1em;
  height: 2em;
  font-size: 2em;
  &:focus {
    text-decoration: underline;
  }
`
const Adventure = styled(TypeButton)`
  color: ${AdventureColors.coldBreath};
  font: ${AdventureFonts.h1};
  font-size: 2em;
  text-shadow: ${Colors.textShadow};
  ${AdventureColors.stripesBackground(.5, .5, 0, 20)}
  border: .15em solid transparent;
  box-shadow: -2px 2px 2px 1px ${fadeout(darken(Colors.balloons, 0.4), 0.5)},
              -1px 1px 3px 2px ${fadeout(darken(AdventureColors.deep, 0.0), 0.0)} inset;
  &:hover {
    border-color: ${AdventureColors.coldBreath};
  }
  &:active {
    border-color: ${AdventureColors.fireworth};
  }
`
const Blades = styled(TypeButton)`
  color: ${BladesColors.sun};
  font: ${BladesFonts.h1};
  font-size: 2em;
  text-shadow: ${BladesColors.textShadow};
  background: ${BladesColors.stone};
  border: .15em solid ${BladesColors.stone};
  box-shadow: -2px 2px 2px 1px ${fadeout(darken(Colors.balloons, 0.4), 0.5)},
              -1px 1px 3px 2px ${fadeout(darken(BladesColors.stone, 0.2), 0.0)} inset;
  &:hover {
    border-color: ${BladesColors.sun};
  }
  &:active {
    border-color: ${BladesColors.fire};
  }
`
const QueenKiller = styled(TypeButton)`

`

const Container = 'div';
const Header = styled.div`
  padding: 1em;
  text-align: center;
`
const List = 'div';

const TYPE = {
  "World of Adventure": Adventure,
  "Blades in the Dark": Blades,
  "Queen-Killer": QueenKiller
}

const GameTypeList = (props) => {
  const { onClick } = props;
  let gameTypes = [];
  for (let i=0; i < GameTypes.length; i++) {
    let gameType = GameTypes[i];
    let Node = TYPE[gameType.name];
    gameTypes.push(
      <Node key={i} className={`game-type ${GameTypes[i].className}`}
        onClick={() => onClick(i)}>
        {GameTypes[i].name}
      </Node>
    )
  }
  let showInput = false;
  let subContent = null;
  return (
    <Container>
      <Header className='header'>
        Choose a game
      </Header>
      <List>
        {gameTypes}
      </List>
    </Container>
  );
}

GameTypeList.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default GameTypeList;
