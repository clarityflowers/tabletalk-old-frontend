import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Roll from './roll';

import CommonChatbox from 'games/common/chatbox/chatbox';

import Colors from 'games/world-of-adventure/colors';
import Fonts from 'games/world-of-adventure/fonts';
import { ACTIONS } from 'games/world-of-adventure/enums';
import { fadeout } from 'utils/color-tools';

const { coldBreath, necessita, shadow, rainedFlowersToday, deep } = Colors;

const StyledChatbox = styled(CommonChatbox)`
  font: ${Fonts.body};
  font-size: 16px;
  background: ${coldBreath};
  color: ${necessita};
  box-shadow: ${shadow};
  button {
      text-shadow: -1px 1px 1px ${fadeout(necessita, .7)};
      box-shadow: 0 1px 1px 1px ${fadeout(necessita, .8)};
      color: ${rainedFlowersToday};
      background: ${coldBreath};
      &:focus {
        outline: none;
      }
      &.notify {
        background: ${rainedFlowersToday};
        color: ${coldBreath};
      }
  }
  h1 {
    border-bottom: 1px solid ${necessita};
  }
  .divider {
    border: 1px inset ${deep};
  }
  textarea {
    background: ${coldBreath};
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
