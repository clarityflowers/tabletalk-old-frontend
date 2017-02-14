import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Roll from './roll';
import Log from './log';

import Colors from 'blades/common/colors';
const { sun, mud, sky, shadow } = Colors;
import Fonts from 'blades/common/fonts';
import CommonChatbox from 'common/chatbox/chatbox';
import { ACTIONS } from 'blades/common/enums';

const StyledChatbox = styled(CommonChatbox)`
  background-color: ${sun};
  color: ${mud};
  font: ${Fonts.body};
  font-size: 16px;
  box-shadow: ${shadow};
  button {
    text-shadow: -1px 1px 1px fade-out($stone, .7);
    box-shadow: 0 1px 1px 1px fade-out($stone, .8);
    color: ${sky};
    background-color: ${sun};
    &.notify {
      background-color: ${sky};
      color: ${sun};
    }
  }
  textarea {
    font-size: 1em;
    font-family: 'Raleway';
    font-weight: 300;
    background: ${sun};
  }
  .divider {
    border: 1px inset ${mud};
  }
`

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.newest = null;
    this.renderEvent = this.renderEvent.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.events.length == nextProps.events.length) {
      return false;
    }
    return true;
  }
  renderEvent(event) {
    if (event.action == ACTIONS.ROLL) {
      return (
        <Roll name={event.player.name}
              level={event.level}
              result={event.result}
              newest={event.id == this.newest}/>
      );
    }
    else if (event.action == ACTIONS.LOG) {
      return (
        <Log name={event.player.name} message={event.message}/>
      );
    }
    else {
      return null;
    }
  }
  render() {
    const { events } = this.props;
    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i];
      if (event.action == ACTIONS.ROLL) {
        this.newest = event.id;
        break;
      }
    }
    return (
      <StyledChatbox {...this.props} renderEvent={this.renderEvent}/>
    )
  }
}

export default Chatbox;
