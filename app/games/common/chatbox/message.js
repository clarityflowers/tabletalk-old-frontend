import React from 'react';
import styled from 'styled-components';

import Talk from './talk';
import { ACTIONS } from 'games/common/enums';

const Header = styled.h1`
  border-bottom: 1px solid black;
  font-size: 1em;
  position: relative;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  margin: 2em 0 0 0;
`

let Message = (props) => {
  let content = null;
  let player = null;
  if (props.prevPlayer != props.event.player) {
    player = (
      <Header>
        {props.event.player.name}
      </Header>
    )
  }
  content = props.renderEvent(props.event);
  if (content == null) {
    if (props.event.action == ACTIONS.TALK) {
      content = (
        <Talk player={props.event.player}
              message={props.event.message}/>
      )
    }
  }
  return (
    <div className='message'>
      {player}
      {content}
    </div>
  )
}

export default Message;
