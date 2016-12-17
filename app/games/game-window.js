import React from 'react';
import WorldOfAdventure from 'games/world-of-adventure/app.js';
import BladesInTheDark from 'games/blades-in-the-dark/app.js';
import { GameTypes } from 'utils/enums.js';
import './game-window.scss';

let GameWindow = (props) => {
  let result = null;
  if (props.go) {
    let gameType = GameTypes[props.game.type];
    if (gameType)
    {
      if (gameType.name == 'World of Adventure')
      {
        result = (
          <WorldOfAdventure options={props.options}
                            auth={props.auth}
                            game={props.game}/>
        )
      }
      else if (gameType.name == 'Blades in the Dark')
      {
        result = (
          <BladesInTheDark  options={props.options}
                            auth={props.auth}
                            game={props.game}/>
        )
      }
    }

  }
  return (
    <div className='game-window'>
      {result}
    </div>
  )
}

export default GameWindow;
