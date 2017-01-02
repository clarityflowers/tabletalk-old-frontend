import React from 'react';
import cx from 'classnames';
import CommonChatbox from 'games/common/chatbox.js';
import { bonusString } from 'games/world-of-adventure/utils.js';
import { ACTIONS } from 'games/world-of-adventure/enums.js';
import './chatbox.scss';

let Roll = (props) => {
  let total = props.result[0] + props.result[1] + props.bonus;
  let bonus = bonusString(props.bonus);
  let numberClassName = cx(
    'number',
    {
      hit: total >= 10,
      miss: total <= 6
    }
  )
  if (props.result[0] == 0 && props.result[1] == 0) {
    total = (
      <div className='loading'>l</div>
    )
  }
  return (
    <div className='roll'>
      <div className='header'>
        {props.name} rolled
        <span className='dice'>
          {props.result[0]}
          {props.result[1]}
        </span>
        {bonus}
      </div>
      <div className={numberClassName}>
        {total}
      </div>
    </div>
  )
}

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
      <CommonChatbox events={this.props.events}
                     playerHash={this.props.playerHash}
                     onChat={this.props.onChat}
                     renderEvent={this.renderEvent.bind(this)}/>
    )
  }
}

export default Chatbox;
