import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import CommonTextInput from 'common/text-input';
import CommonSubmit from 'common/submit';
import Colors from 'common/colors';
import Fonts from 'common/fonts';

const { background, middleground, color, shadow } = Colors.details;

const formTransition = ({off}) => {
  if (off) {
    return `top .5s cubic-bezier(0.7,-0.3,0.3,0.7)`;
  }
  return `top .5s cubic-bezier(0.7,0.3,0.3,1.3)`;
}
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 150%;
  color: ${background};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${p => p.off ? `-150%` : `-25%`};
  left: 0%;
  background-color: ${color};
  transition: ${formTransition};
  z-index: 2;
  flex-direction: column;
  vertical-align: middle;
`
const Form = styled.form`
  position: relative;
`
const Transition = styled(CSSTransitionGroup)`
  position: relative;
  top: -1.1em;
  height: 1em;
  width: 100%;
`
const LabelContainer = styled.div`
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  transition-property: left, right;
  transition-duration: .7s;
  transition-delay: .4s;
  transition-timing-function: cubic-bezier(0.7,-0.3,0.3,1.3);
  &.anim-enter {
    left: -100vw;
    &.anim-enter-active {
      left: 0;
    }
  }
  &.anim-leave {
    right: 0;
    &.anim-leave-active {
      right: -100vw;
    }
  }
`
const Label = styled.label`
  display: inline-block;
`
const FormInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.6em;
  position: relative;
`
const TextInput = styled(CommonTextInput)`
  -webkit-appearance: none;
  border: none;
  font: ${Fonts.body};
  color: ${color};
  border-radius: 0;
  background-color: ${middleground};
  font-weight: bold;
  padding: .3em .3em 0em .3em;
  display: inline-block;
  overflow: visible;
  border: none;
  font-size: 1.1em;
  line-height: 1.2em;
  vertical-align: middle;
  width: 12em;
  box-shadow: -1px 1px 1px 1px ${shadow} inset;
  z-index: 3;
  &:focus {
    outline: none;
    background-color: $background;
  }
`
const InputCover = styled.div`
  position: absolute;
  top: -5%;
  content: '';
  width: ${p => p.off ? '0%' : '110%'};
  left: ${p => p.off ? '105%' : '-5%'};
  height: 110%;
  background-color: ${color};
  z-index: 4;
  transition-duration: .4s;
  transition-timing-function: ease-in-out;
  transition-property: ${p => p.off ? 'width, left' : 'width'};
`
const Submit = styled(CommonSubmit)`
  -webkit-appearance: none;
  display: inline-block;
  border: none;
  padding: .3em;
  font: ${Fonts.icon};
  border-radius: .2em;
  margin-left: .2em;
  font-size: 1.1em;
  height: 1.6em;
  vertical-align: middle;
  box-shadow: -1px 1px 1px 1px ${shadow} inset;
  text-shadow: -1px 1px 1px ${shadow}, .5);
  z-index: 5;
  transition-duration: .7s;
  transition-timing-function: ease-in-out;
  transition-property: color, background-color, box-shadow, text-shadow;
  &:not(:disabled) {
    background-color: ${middleground};
    color: ${color};
    &:active, &:focus, &:hover {
      background-color: ${background};
      outline: none;
    }
    &:active {
      color: ${middleground};
      background-color: ${color};
    }
  }
  &:disabled {
    background-color: ${color};
    color: ${color};
    box-shadow: none;
    text-shadow: none;
  }
`


class NewGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      showInput: false
    }
    this.input = null;
  }
  setTimeout(resolve, duration) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(resolve, duration);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.off && !nextProps.off) {
      setTimeout(() => {
        this.setState({showInput: true});
        ReactDOM.findDOMNode(this.input).focus();
      }, 700);
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value.substr(0, 25)});
  }
  handleSubmit(key, event) {
    event.preventDefault();
    this.props.onSubmit(key, this.state.value, this.props.game.id);
    this.setState({showInput: false});
    if (key == 'name') {
      this.setTimeout(() => {
        this.setState({
          value: '',
          showInput: true
        });
      }, 1100);
    }
  }
  render() {
    const { game, joining, off } = this.props;
    const { value, showInput } = this.state;
    let key = 'loading';
    if (game.name == null) {
      key = 'name';
    }
    else if (game.players.length == 0) {
      key = 'player';
    }
    else if (game.me == null && !joining) {
      key = 'join';
    }
    let text = '';
    if (key == 'name') {
      text = 'Enter a name for the game';
    }
    else if (key == 'player' || key == 'join') {
      text = "What's your name?"
    }
    else if (key == 'loading'){
      text = 'Loading...';
    }
    let label = (
      <LabelContainer key={key}>
        <Label>{text}</Label>
      </LabelContainer>
    )
    return (
      <Container off={off}>
        <Form onSubmit={this.handleSubmit.bind(this, key)}>
          <Transition transitionName="anim"
                      component='div'
                      transitionEnterTimeout={1100}
                      transitionLeaveTimeout={1100}>
            {label}
          </Transition>
          <FormInput>
            <TextInput value={value}
                       onChange={this.handleChange.bind(this)}
                       ref={e => this.input = e}
                       disabled={off}/>
            <InputCover off={showInput}/>
            <Submit value='>' disabled={!showInput}/>
          </FormInput>
        </Form>
      </Container>
    );
  }
}

NewGameForm.propTypes = {
  off: React.PropTypes.bool.isRequired,
  game: React.PropTypes.object.isRequired,
  joining: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

export default NewGameForm;
