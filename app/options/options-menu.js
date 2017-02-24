'use strict'

import React from 'react';
import styled from 'styled-components';
import update from 'react-addons-update';

import Label from './label';
import OptionsButton from './options-button';

import Colors from 'common/colors';
import Fonts from 'common/fonts';

const { shadowColor, hearts, boxShadow } = Colors;
import { HoverWiggle } from 'utils/hover-animate';

const height = (count) => {
  return 1.8 * count + 0.2;
}
const padding = 1;
const Labels = styled.div`
  z-index: 1;
  position: absolute;
  right: 1em;
  top: .2em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: none;
`
const Divider = styled.div`
  height: 0;
  width: 80%;
  display: inline-block;
  border-width: .05em;
  border-style: inset;
  border-color: ${shadowColor};
  border-radius: .1em;
  margin-top: .1em;
`
const bannerPosition = ({state, count}) => {
  if (state == 'hidden') {
    return `${-padding - height(count) - .4}`;
  }
  else if (state == 'closed') {
    return `${-padding - height(count) + 1.8}`;
  }
  return `${-padding}`;
}
const bannerHeight = ({count}) => {
  return (height(count) + padding);
}
const delay = ({state}) => {
  if (state == 'hidden') { return 0.3; }
  else if (state == 'closed') { return 0.1; }
  else return 0;
}
const Banner = styled.div`
  transition: top .3s cubic-bezier(0.730, -0.300, 0.375, 1.360);
  transition-delay: ${delay}s;
  box-shadow: ${boxShadow};
  background-color: ${hearts};
  position: relative;
  right: 0;
  top: ${bannerPosition}em;
  width: 1.8em;
  height: ${bannerHeight}em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
`;
const Container = styled.div`
  color: red;
  right: 2em;
  top: 0;
  height: 1em;
  position: absolute;
  z-index: 20;
  font-size: 20px;
  user-select: none;
  @media only screen and (max-width: 800px) {
    font-size: 16px;
  }
`

const ANIM_TIMES = [200, 600];

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hovering: null,
      hoverAnim: [0, 0, 0, 0]
    };
    this.timeouts = [];
  }
  componentWillUnmount() {
  }
  toggle() {
    this.setState({open: !this.state.open});
  }
  signout() {
    this.setState({open: false});
    this.props.auth.signOut();
    this.props.route.set('/').go();
  }
  goHome() {
    this.setState({open: false});
    this.props.route.set('/games').go();
  }
  safeTimeout(key, time, cb) {
    clearTimeout(this.timeouts[key]);
    this.timeouts[key] = setTimeout(() => {
      cb(key);
    }, time);
  }
  animate(key) {
    let step = this.state.hoverAnim[key];
    if (step < ANIM_TIMES.length) {
      this.safeTimeout(key, ANIM_TIMES[step], this.animate.bind(this));
    }
    let hoverAnim = update(this.state.hoverAnim, {
      [key]: {$set: step + 1}
    });
    this.setState({hoverAnim: hoverAnim});
  }
  handleMouseEnter(key) {
    if (this.state.hoverAnim[key] > 0) {
      let hoverAnim = update(this.state.hoverAnim, {
        [key]: {$set: -1}
      });
      this.setState({hoverAnim: hoverAnim});
      this.safeTimeout(key, 70, this.animate.bind(this));
    }
    else {
      this.animate(key);
    }
    this.setState({hovering: key});

  }
  handleMouseLeave(key) {
    if (this.state.hovering == key) {
      this.setState({hovering: null});
    }
  }
  render() {
    let state = 'hidden';
    if (this.props.auth.online && this.props.on) {
      if (this.state.open) {
        state = 'open';
      }
      else {
        state = 'closed';
      }
    }
    let options = [
      {
        text: this.props.auth.name,
        glyph: 'u',
        onClick: this.toggle.bind(this),
        on: (
          this.state.open || (
            this.props.showName && this.props.auth.online && this.props.on
          )
        )
      },
      {
        text: 'Signout',
        glyph: 'p',
        onClick: this.signout.bind(this),
        on: this.state.open
      },
      {
        text: 'Home',
        glyph: 'h',
        onClick: this.goHome.bind(this),
        on: this.state.open
      },
    ];
    let labels = [];
    let buttons = [];
    for (let i=0; i < options.length; i++) {
      let option = options[i];
      let index = i;
      if (i == 0 && !this.state.open) {
        index = options.length
      }
      let labelIsHovering = (
        (this.state.hoverAnim[index] >= 0 && this.state.hovering == index) ||
        (this.state.hoverAnim[index] == 1)
      );
      let buttonIsHovering = (
        (this.state.hoverAnim[i] >= 0 && this.state.hovering == i) ||
        (this.state.hoverAnim[i] >= 1)
      );
      labels.push(
        <Label key={i}
               index={index}
               text={option.text}
               on={option.on}
               isToggling={false}
               isHovering={labelIsHovering}
               onMouseEnter={this.handleMouseEnter.bind(this)}
               onMouseLeave={this.handleMouseLeave.bind(this)}
               menuState={state}
               isTitle={i == 0}
               disabled={!option.on}
               onClick={option.onClick}/>
      );
      buttons.push(
        <OptionsButton onClick={option.onClick}
                       key={i}
                       index={i}
                       isHovering={buttonIsHovering}
                       onMouseEnter={this.handleMouseEnter.bind(this)}
                       onMouseLeave={this.handleMouseLeave.bind(this)}
                       disabled={i != 0 && !this.state.open}
                       glyph={option.glyph}/>
      );
    }
    buttons.push(
      <Divider key='divider'/>
    );
    let isHovering = (
      (
        this.state.hoverAnim[options.length] >= 0 &&
        this.state.hovering == options.length
      ) ||
      this.state.hoverAnim[options.length] >= 1
    )
    buttons.push(
      <OptionsButton onClick={this.toggle.bind(this)}
                     key={options.length}
                     index={options.length}
                     isHovering={isHovering}
                     onMouseEnter={this.handleMouseEnter.bind(this)}
                     onMouseLeave={this.handleMouseLeave.bind(this)}
                     glyph='g'/>
    );
    const count = options.length + 1;
    return (
      <Container>
        <Labels>
          {labels}
        </Labels>
        <Banner state={state} count={count}>
          {buttons}
        </Banner>
      </Container>
    )
  }
}

export default OptionsMenu
