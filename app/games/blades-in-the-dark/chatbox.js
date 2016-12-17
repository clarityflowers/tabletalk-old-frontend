import React from 'react';
import Textarea from 'react-textarea-autosize';
import cx from 'classnames';
import { bonusString } from 'games/blades-in-the-dark/utils.js';
import { ACTIONS } from 'games/blades-in-the-dark/enums.js';
import './chat.scss';

let Talk = (props) => {
  return (
    <div className='talk'>
      <p>
        {props.message}
      </p>
    </div>
  )
}

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

let Message = (props) => {
  let content = null;
  let player = null;
  if (props.prevPlayer != props.chat.player) {
    player = (
      <h1>
        {props.chat.player.name}
      </h1>
    )
  }
  if (props.chat.action == ACTIONS.TALK) {
    content = (
      <Talk player={props.chat.player}
            message={props.chat.message}/>
    )
  }
  else if (props.chat.action == ACTIONS.ROLL) {
    content = (
      <Roll name={props.chat.player.name}
            level={props.chat.level}
            result={props.chat.result}/>
    )
  }
  return (
    <div className='message'>
      {player}
      {content}
    </div>
  )
}

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  handleKeyDown(e) {
    if (e.key == 'Enter' && !e.shiftKey) {
      this.props.onChat(this.state.value);
      this.setState({value: ""});
      e.preventDefault();
    }
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    return (
      <Textarea id='input'
                placeholder='Say something'
                onKeyDown={this.handleKeyDown.bind(this)}
                onChange={this.handleChange.bind(this)}
                value={this.state.value}/>
    );
  }
}

class Chatbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      off: true,
      input: ""
    }
  }
  handleToggle() {
    this.setState((state) => {
      return {
        off: !state.off
      }
    })
  }
  scrollToBottom() {
    let node = this.refs.conversation;
    node.scrollTop = node.scrollHeight;
  }
  componentWillUpdate(newProps, newState) {
    let node = this.refs.conversation;
    this.atBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.off && !this.state.off) {
      setTimeout(this.scrollToBottom.bind(this), 700);
    }
    else if (this.atBottom) {
      this.scrollToBottom();
    }
  }
  handleChat(message) {
    this.scrollToBottom();
    this.props.onChat(message);
  }
  render() {
    let className = cx({
      off: this.state.off
    })
    let toggleClassName = cx({
      notify: !this.state.off
    })
    let messages = [];
    let prevPlayer = null;
    for (let i=0; i < this.props.chats.length; i++) {
      let chat = this.props.chats[i];
      messages.push(
        <Message key={chat.id} chat={chat} prevPlayer={prevPlayer}/>
      )
      prevPlayer = chat.player;
    }
    return (
      <div id='chat' className={className}>
        <button id='toggle'
                onClick={this.handleToggle.bind(this)}
                className={toggleClassName}>
          {this.state.off ? '%' : '^'}
        </button>
        <div id='body'>
          <div id='conversation' ref='conversation'>
            {messages}
          </div>
          <div id='divider'/>
          <Input onChat={this.handleChat.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Chatbox;
