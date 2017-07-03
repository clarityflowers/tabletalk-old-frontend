import React from 'react';
import rx from 'resplendence';

import { Dot } from 'blades/window/common/dot';
import Row from 'common/row';
import Button from 'common/button';

import connect from 'utils/connect';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";

$unchecked: darken($stone, 5%);
`

const ActionDot = rx(Dot)`--1
  border-color: $unchecked;
  background: $unchecked;
  &.checked {
    border-color: $sun;
    background: $sun;
  }
  &.highlight {
    border-color: $sand;
    background: $sand;
  }
`;
const Divider = rx('div')`
  margin: 0 .2em;
  background: $sun;
  width: 1px;
  align-self: stretch;
  transition: background 1s;
  &.highlight {
    background: $sand;
  }
`
const Name = rx('div')`
  font: $h2;
  font-size: 0.8em;
  transition: color .5s;
  margin-left: .3em;
  font-weight: 500;
`;
const ActionButton = rx(Button)`--1
  color: $sun;
  &:not(:disabled) {
    color: $sand;
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      color: $fire;
      .check:not(.checked) {
        background: $fire;
        border-color: $fire;
        & ~ .check:not(.checked) {
          background: $unchecked;
          border-color: $unchecked;
        }
      }
    }
  }
`;

class Action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
    this.clicked = false;
  }
  handleMouseOver() {
    this.setState({hover: true});
  }
  handleMouseLeave() {
    this.setState({hover: false});
  }
  handleClick() {
    if (!this.clicked) {
      this.clicked = true;
      this.props.dispatch('advance_action', this.props.name.toLowerCase());
    }
    setTimeout(() => {this.clicked = false}, 2000);
  }
  render() {
    const { name, value, disabled, unlocked } = this.props;
    const { hover } = this.state;
    let dots = [];
    for (let i=1; i <= 4; i++) {
      const active = !disabled && unlocked && i == value + 1
      dots.push(
        <ActionDot key={i} checked={value >= i}
                   rx={{highlight: active}} isButton={false}/>
      )
      if (i == 1) {
        dots.push(
          <Divider key={'d'} rx={{highlight: unlocked}}/>
        );
      }
    }
    const active = !disabled && unlocked && value < 4
    let handlers = {}
    if (active) {
      handlers = {
        onMouseOver: this.handleMouseOver.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onClick: this.handleClick.bind(this),
        tabIndex: 0
      }
    }
    return (
      <ActionButton {...handlers} disabled={!active}>
        <Row>
          {dots}
          <Name>
            {name[0].toUpperCase() + name.substring(1)}
          </Name>
        </Row>
      </ActionButton>
    );
  }
}

Action.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool,
  unlocked: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

Action.defaultProps = {
  disabled: false
}

export default connect(Action);
