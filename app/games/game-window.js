import React from 'react';
import WorldOfAdventure from './world-of-adventure/app.js';
import { GameTypes } from 'utils/enums.js';
import './game-window.scss';

let GameWindow = (props) => {
  let result = null;
  let gameType = GameTypes[props.game.type];
  if (gameType && gameType.name == 'World of Adventure') {
    result = (
      <WorldOfAdventure options={props.options}
                        auth={props.auth}
                        game={props.game}/>
    )
  }
  return (
    <div className='game-window'>
      {result}
    </div>
  )
}

export default GameWindow;
