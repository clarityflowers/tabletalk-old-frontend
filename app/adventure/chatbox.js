import React from 'react';
import rx from 'resplendence';

import Roll from './roll';

import CommonChatbox from 'common/chatbox/chatbox';

import { ACTIONS } from 'adventure/enums';

rx`
@import "~adventure/colors";
@import "~adventure/fonts";
`

const StyledChatbox = rx(CommonChatbox)`--1
  background: $cold-breath;
  font: $body;
  font-size: 16px;
  color: $necessita;
  box-shadow: $shadow;
  button {
      text-shadow: -1px 1px 1px fade-out($necessita, .7);
      box-shadow: 0 1px 1px 1px fade-out($necessita, .8);
      color: $rained-flowers-today;
      background: $cold-breath;
      &:focus {
        outline: none;
      }
      &.notify {
        background: $rained-flowers-today;
        color: $cold-breath;
      }
  }
  h1 {
    border-bottom: 1px solid $necessita;
  }
  .divider {
    border: 1px inset $deep;
  }
  textarea {
    background: $cold-breath;
  }
`

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
  }
  renderEvent(event) {
    if (event.action == ACTIONS.ROLL) {
      return (
        <Roll name={event.player.name}
              bonus={event.bonus}
              result={event.result}/>
      );
    }
    else {
      return null;
    }
  }
  render() {
    return (
      <StyledChatbox events={this.props.events}
                     playerHash={this.props.playerHash}
                     onChat={this.props.onChat}
                     renderEvent={this.renderEvent.bind(this)}/>
    )
  }
}

export default Chatbox;
