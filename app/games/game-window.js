import React from 'react';
import GameStore from './game-store.js';
import './game-window.scss';

let GameWindow = (props) => {
  return (
    <div className='game-window'>
      <GameStore options={props.options}
                 auth={props.auth}
                 game={props.game}
                 go={props.go}/>
    </div>
  )
}

export default GameWindow;
