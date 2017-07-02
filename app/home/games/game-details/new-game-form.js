import React from 'react';
import ReactDOM from 'react-dom';
import rx from 'resplendence';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import CommonTextInput from 'common/text-input';
import CommonSubmit from 'common/submit';

rx`
@import "~common/colors";
@import "~common/fonts";
`

const Container = rx('div')`
  position: absolute;
  width: 100%;
  height: 150%;
  color: $details-background;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -25%;
  left: 0%;
  background-color: $details-color;
  transition: top .5s cubic-bezier(0.7,0.3,0.3,1.3);
  z-index: 2;
  flex-direction: column;
  vertical-align: middle;
  &.off {
    top: -150%;
    transition:top .5s cubic-bezier(0.7,-0.3,0.3,0.7);
  }
`
const Form = rx('form')`
  position: relative;
`
const Transition = rx(CSSTransitionGroup)`
  position: relative;
  top: -1.1em;
  height: 1em;
  width: 100%;
`
const LabelContainer = rx('div')`
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
const Label = rx('label')`
  display: inline-block;
`
const FormInput = rx('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.6em;
  position: relative;
`
const TextInput = rx(CommonTextInput)`--1
  -webkit-appearance: none;
  border: none;
  font: $body;
  color: $details-color;
  border-radius: 0;
  background-color: $details-middleground;
  font-weight: bold;
  padding: .3em .3em 0em .3em;
  display: inline-block;
  overflow: visible;
  border: none;
  font-size: 1.1em;
  line-height: 1.2em;
  vertical-align: middle;
  width: 12em;
  box-shadow: -1px 1px 1px 1px $details-shadow inset;
  z-index: 3;
  &:focus {
    outline: none;
    background-color: $details-background;
  }
`
const InputCover = rx('div')`
  position: absolute;
  top: -5%;
  content: '';
  width: 110%;
  left: -5%;
  height: 110%;
  background-color: $details-color;
  z-index: 4;
  transition-duration: .4s;
  transition-timing-function: ease-in-out;
  transition-property: width;
  &.off {
    width: 0%;
    left: 105%;
    transition-property: width, left;
  }
`
const Submit = rx(CommonSubmit)`--1
  -webkit-appearance: none;
  display: inline-block;
  border: none;
  padding: .3em;
  font: $icon;
  border-radius: .2em;
  margin-left: .2em;
  font-size: 1.1em;
  height: 1.6em;
  vertical-align: middle;
  box-shadow: -1px 1px 1px 1px $details-shadow inset;
  text-shadow: -1px 1px 1px $details-shadow;
  z-index: 5;
  transition-duration: .7s;
  transition-timing-function: ease-in-out;
  transition-property: color, background-color, box-shadow, text-shadow;
  &:not(:disabled) {
    background-color: $details-middleground;
    color: $details-color;
    &:active, &:focus, &:hover {
      background-color: $details-background;
      outline: none;
    }
    &:active {
      color: $details-middleground;
      background-color: $details-color;
    }
  }
  &:disabled {
    background-color: $details-color;
    color: $details-color;
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
      <Container rx={{off}}>
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
                       innerRef={e => this.input = e}
                       disabled={off}/>
            <InputCover rx={{off: showInput}}/>
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
