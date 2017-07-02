import React from 'react';
import rx from 'resplendence';
import cx from 'classnames';

rx`
@import "~blades/common/colors";
@import "~blades/common/fonts";

@mixin roll-color {
  transition: color 60s;
  color: fade-out($stone, 0.3);
  &.dim {
    color: fade-out($stone, 0.6);
  }
  &.miss {
    color: $stone;
  }
  &.weak {
    color: $sky;
  }
  &.crit, &.strong {
    color: $fire;
  }
}
`
const Die = rx('div')`
  @include roll-color;
`
const Dice = rx('div')`
  margin: 0 .2em;
  position: relative;
  bottom: -0.15em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font: $icon;
  font-size: 1.5em;
`
const Number = rx('div')`
  margin-top: 0em;
  font-family: 'Rajdhani';
  font-weight: 700;
  font-size: 3em;
  text-align: center;
  @include roll-color;
`
const Container = 'div';

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
  let rx = {};
  if (newest) {
    rx = {
      crit,
      strong: result == 6,
      weak: result >= 4 && result <= 5,
      miss: result <= 3
    }
  }
  let searching = true;
  for (let i=0; i < props.result.length; i++) {
    let dieRx = 'dim';
    if (props.result[i] == result && searching) {
      if (result < 6) {
        searching = false;
      }
      dieRx = rx;
    }
    dice.push(
      <Die key={i} rx={dieRx}>{props.result[i]}</Die>
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
    <Container>
      <Dice>
        {dice}
      </Dice>
      <Number rx={rx}>
        {result}
      </Number>
    </Container>
  )
}

export default Roll;
