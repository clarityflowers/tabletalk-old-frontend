import React from 'react';
import Textarea from 'react-textarea-autosize';
import cx from 'classnames';
import { ACTIONS } from './enums.js';
import './chatbox.scss';

let Talk = (props) => {
  return (
    <div className='talk'>
      <p>
        {props.message}
      </p>
    </div>
  )
}

let Message = (props) => {
  let content = null;
  let player = null;
  if (props.prevPlayer != props.event.player) {
    player = (
      <h1>
        {props.event.player.name}
      </h1>
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
    for (let i=0; i < this.props.events.length; i++) {
      let event = this.props.events[i];
      messages.push(
        <Message key={event.id}
                 event={event}
                 prevPlayer={prevPlayer}
                 renderEvent={this.props.renderEvent}/>
      )
      prevPlayer = event.player;
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
