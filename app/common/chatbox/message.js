import React from 'react';
import styled from 'styled-components';

import Talk from './talk';
import { ACTIONS } from 'common/enums';

const Header = styled.h1`
  border-bottom: 1px solid black;
  font-size: 1em;
  position: relative;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  margin: 2em 0 0 0;
`

class Message extends React.PureComponent {
  render() {
    const { prevPlayer, event, renderEvent } = this.props;
    let content = null;
    let player = null;
    if (prevPlayer != event.player) {
      player = (
        <Header>
          {event.player.name}
        </Header>
      )
    }
    content = renderEvent(event);
    if (content == null) {
      if (event.action == ACTIONS.TALK) {
        content = (
          <Talk player={event.player}
                message={event.message}/>
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
}

export default Message;
