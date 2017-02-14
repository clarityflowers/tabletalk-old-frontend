'use strict'

import React from 'react';
import styled from 'styled-components';

import GameStore from './game-store.js';

const Window = styled.div`
  background-color: red;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 0;
`

let GameWindow = (props) => {
  return (
    <Window>
      <GameStore route={props.route}
                 auth={props.auth}
                 options={props.options}
                 game={props.game}
                 go={props.go}/>
    </Window>
  )
}

export default GameWindow;
