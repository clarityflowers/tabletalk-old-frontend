import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Colors from 'common/colors';
import Fonts from 'common/fonts';
import { GameTypes } from 'utils/enums';
import { HoverBuzz } from 'utils/hover-animate';


const GameTypeList = (props) => {
  const { onClick } = props;
  let gameTypes = [];
  for (let i=0; i < GameTypes.length; i++) {
    gameTypes.push(
      <HoverBuzz key={i}>
      <button className={`game-type ${GameTypes[i].className}`}
      onClick={() => onClick(i)}>
      {GameTypes[i].name}
      </button>
      </HoverBuzz>
    )
  }
  let showInput = false;
  let subContent = null;
  return (
    <div>
      <div className='header'>
        Choose a game
      </div>
      <div className='game-type-list'>
        {gameTypes}
      </div>
    </div>
  );
}

GameTypeList.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default GameTypeList;
