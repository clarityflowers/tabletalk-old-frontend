import React from 'react';
import Textarea from 'react-textarea-autosize';
import cx from 'classnames';
import { bonusString } from 'games/world-of-adventure/utils.js';
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
  if ('message' in props.chat) {
    content = (
      <Talk player={props.chat.player}
            message={props.chat.message}/>
    )
  }
  else if ('roll' in props.chat) {
    content = (
      <Roll name={props.chat.player.name}
            bonus={props.chat.roll.bonus}
            result={props.chat.roll.result}/>
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
                onKeyDown={this.handleKeyDown.bind(this)}
                onChange={this.handleChange.bind(this)}
                value={this.state.value}/>
    );
  }
}

class Chat extends React.Component {
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
    if (this.atBottom) {
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
    for (let i=0; i < this.props.events.length; i++) {
      let event = this.props.events[i];
      if ('chat' in event) {
        let chat = event.chat;
        messages.push(
          <Message key={event.id} chat={chat} prevPlayer={prevPlayer}/>
        )
        prevPlayer = chat.player;
      }
    }
    return (
      <div id='chat' className={className}>
        <button id='toggle'
                onClick={this.handleToggle.bind(this)}
                className={toggleClassName}>
          {this.state.off ? '^' : '%'}
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

export default Chat;
