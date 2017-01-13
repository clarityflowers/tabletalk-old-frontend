import React from 'react';
import cx from 'classnames';
import CommonChatbox from 'games/common/chatbox.js';
import { ACTIONS } from 'games/blades-in-the-dark/common/enums.js';
import './chatbox.scss';

let Log = (props) => {
  const { name, message } = props;
  const text = message.replace("{player}", name);
  return (
    <div className='log'>
      {text}
    </div>
  ) ;
}

let Roll = (props) => {
  let { newest } = props;
  let result = 0;
  let crit = false;
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
      if (result == 6 && props.result[i] == 6) {
        crit = true;
      }
      else if (props.result[i] > result) {
        result = props.result[i];
      }
    }
  }
  let dice = [];
  for (let i=0; i < props.result.length; i++) {
    const className = cx('die', {
      highlight: props.result[i] == result
    });
    dice.push(
      <div key={i} className={className}>{props.result[i]}</div>
    )
  }
  let rollClassName = cx(
    'roll',
    {
      crit: newest && crit,
      strong: newest && !crit && result == 6,
      weak: newest && (result == 4 || result == 5),
      miss: newest && result <= 3
    }
  )
  if (result == 0) {
    result = (
      <div className='loading'>l</div>
    )
  }
  if (crit) {
    result = 'CRIT';
  }
  return (
    <div className={rollClassName}>
      <div className='header'>
        {props.name} rolled {props.level}
      </div>
      <div className='dice'>
        {dice}
      </div>
      <div className='number'>
        {result}
      </div>
    </div>
  )
}

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.newest = null;
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
      <CommonChatbox events={this.props.events}
                     playerHash={this.props.playerHash}
                     onChat={this.props.onChat}
                     renderEvent={this.renderEvent.bind(this)}/>
    )
  }
}

export default Chatbox;
