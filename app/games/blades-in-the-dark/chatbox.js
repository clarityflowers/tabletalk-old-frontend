import React from 'react';
import cx from 'classnames';
import CommonChatbox from 'games/common/chatbox.js';
import { bonusString } from 'games/blades-in-the-dark/utils.js';
import { ACTIONS } from 'games/blades-in-the-dark/enums.js';
import './chatbox.scss';

let Roll = (props) => {
  let result = 0;
  if (props.level == 0) {
    if (props.result[0] < props.result[1]) {
      result = props.result[0];
    }
    else {
      result = props.result[1];
    }
  }
  else {
    for (let i = 0; i < props.result.length; i++) {
      if (props.result[i] > result) {
        result = props.result[i];
      }
    }
  }
  let numberClassName = cx(
    'number',
    {
      hit: result == 6,
      miss: result <= 3
    }
  )
  let diceClassName = cx(
    'dice',
    {
      zero: props.level == 0
    }

  )
  if (result == 0) {
    result = (
      <div className='loading'>l</div>
    )
  }
  return (
    <div className='roll'>
      <div className='header'>
        {props.name} rolled
        <span className={diceClassName}>
          {props.result}
        </span>
      </div>
      <div className={numberClassName}>
        {result}
      </div>
    </div>
  )
}

class Chatbox extends React.Component {
  constructor(props) {
    super(props)
  }
  renderEvent(event) {
    if (event.action == ACTIONS.ROLL) {
      return (
        <Roll name={event.player.name}
              level={event.level}
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
