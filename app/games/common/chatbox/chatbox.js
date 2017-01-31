import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Talk from './talk';
import Message from './message';
import Input from './input';

import { ACTIONS } from 'games/common/enums';

import Button from 'common/button';
import props from 'utils/props';

const Container = styled.div`
  background-color: white;
  color: black;
  box-shadow: -2px 0px 2px 1px fade-out(black, .5);
  width: 20em;
  flex: 0 0 auto;
  font-size: 16px;
  z-index: 100;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -moz-user-select: text;
  -khtml-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
  cursor: text;
  @media only screen and (max-width: ${props => props.breakpoint}px) {
    box-shadow: 0px -6px 2px 1px fade-out(black, .5);
    width: 100%;
    height: ${props => props.off ? '2em' : '100%'};
    position: fixed;
    top: 0;
    left: 0;
    transition: height 0.5s cubic-bezier(1, -0.3, 0, 1.3);
  }
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 0;
  flex: 1 1 auto;
  overflow: hidden;
  @media only screen and (max-width: ${props => props.breakpoint}px) {
    height: ${props => props.off ? 0 : 'auto'};
  }
`
const Toggle = styled(Button)`
  display: none;
  transition-property: color, background-color;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(1, -0.3, 0, 1.3);
  text-shadow: -1px 1px 1px fade-out(black, .7);
  font-family: 'icomoon';
  font-size: 1.5em;
  width: 100%;
  height: 1.5em;
  margin-top: -.2em;
  border: none;
  box-shadow: 0 1px 1px 1px fade-out(black, .8);
  padding: 0;
  color: black;
  background-color: white;
  &:focus {
    outline: none;
  }
  &.notify {
    background-color: black;
    color: white;
  }
  @media only screen and (max-width: ${props => props.breakpoint}px) {
    display: block;
  }
`
const Conversation = styled.div`
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  width: 100%;
  flex: 1 1 auto;
  overflow-y: scroll;
  height: 10em;
  padding: 1em;
  display: block;
  vertical-align: bottom;
`
const Divider = styled.div`
  height: 0px;
  border: 1px inset black;
  flex: none;
  width: 90%;
  border-radius: 1em;
`

class Chatbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      off: true,
      input: ""
    }
    this.conversation = null;
  }
  handleToggle() {
    this.setState((state) => {
      return {
        off: !state.off
      }
    })
  }
  scrollToBottom() {
    if (this.conversation) {
      this.conversation.scrollTop = this.conversation.scrollHeight;
    }
  }
  componentWillUpdate(newProps, newState) {
    if (this.conversation) {
      const { scrollTop, offsetHeight, scrollHeight } = this.conversation;
      this.atBottom = scrollTop + offsetHeight === scrollHeight;
    }
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
    const { events, renderEvent, className, breakpoint } = this.props;
    const { off } = this.state;
    let messages = [];
    let prevPlayer = null;
    for (let i=0; i < events.length; i++) {
      let event = events[i];
      messages.push(
        <Message key={event.id}
                 event={event}
                 prevPlayer={prevPlayer}
                 renderEvent={renderEvent}/>
      )
      prevPlayer = event.player;
    }
    const notify = !off;
    return (
      <Container className={className} breakpoint={breakpoint} off={off}>
        <Toggle className={cx('toggle', {notify})}
          notify={!off}
          breakpoint={breakpoint}
          onClick={this.handleToggle.bind(this)}
          breakpoint={breakpoint}>
          {off ? '%' : '^'}
        </Toggle>
        <Body off={off} breakpoint={breakpoint}>
          <Conversation innerRef={e => this.conversation = e}>
            {messages}
          </Conversation>
          <Divider className='divider'/>
          <Input onChat={this.handleChat.bind(this)}/>
        </Body>
      </Container>
    )
  }
}

Chatbox.propTypes = {
  events: React.PropTypes.array.isRequired,
  renderEvent: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  breakpoint: React.PropTypes.number
}

Chatbox.defaultProps = {
  breakpoint: 800
}

export default Chatbox;
