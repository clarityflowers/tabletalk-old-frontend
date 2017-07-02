import React from 'react';
import rx from 'resplendence';

import CommonButton from 'common/button';
import { HoverBuzz } from 'utils/hover-animate';

rx`
@import "~common/fonts";
@import "~common/colors";
`

const Button = rx(CommonButton)`--1
  font: $h1;
  color: $hearts;
  box-shadow: $boxShadow, $borderShadow;
  background-color: white;
  border: .25em solid $hearts;
  outline: none;
  width: 11.4em;
  height: 2em;
  font-size: 2em;
  border-radius: 0;
  padding: .1em 0 0 0;
  position: relative;
  margin: 0 auto;
  display: inline-block;
  pointer-events: auto;
  &::-moz-focus-inner {
    border: 0;
  }
  &.clicked {
    background-color: $confetti;
  }
  &:not(.clicked) {
    cursor: pointer;
  }
  transition: transform .5s cubic-bezier(0.885, -0.520, 0.925, 0.770);
  &.leaving {
    transform: scale(1);
    &.animating {
      transform: scale(0);
      transition-delay: .3s;
    }
  }
  &.entering {
    transform: scale(0);
    transition: transform .5s cubic-bezier(0.545, 0.170, 0.305, 1.455);
    &.animating {
      transform: scale(1);
      transition-delay: .5s;
    }
  }
  @media only screen and (max-width: 400px) {
    font-size: 12px;
  }
`

class GoogleLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({clicked: true});
    this.props.onClick()
  }
  render() {
    const { clicked } = this.state;
    const { entering, leaving, animating } = this.props;
    return (
      <HoverBuzz off={clicked}>
        <Button id='google-login'
                rx={{clicked, leaving, entering, animating}}
                onClick={this.onClick}>
          Sign in with Google
        </Button>
      </HoverBuzz>
    )
  }
}

const { bool, func } = React.PropTypes;
GoogleLogin.propTypes = {
  entering: bool.isRequired,
  leaving: bool.isRequired,
  animating: bool.isRequired,
  onClick: func.isRequired
}

export default GoogleLogin;
