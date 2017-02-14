import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { fadeout } from 'utils/color-tools';
const { fire, sky, stone } = Colors;

const rollColor = ({color}) => {
  if (color == 'crit' || color == 'strong') {
    return fire;
  }
  else if (color == 'weak') {
    return sky;
  }
  else if (color == 'miss') {
    return stone;
  }
  else if (color == 'dim') {
    return fadeout(stone, .6);
  }
  else {
    return fadeout(stone, .3);
  }
}
const Die = styled.div`
  color: ${rollColor};
  transition: color 60s;
`
const Dice = styled.div`
  margin: 0 .2em;
  position: relative;
  bottom: -0.15em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font: ${Fonts.icon};
  font-size: 1.5em;
`
const Number = styled.div`
  margin-top: 0em;
  font-family: 'Rajdhani';
  font-weight: 700;
  font-size: 3em;
  text-align: center;
  transition: color 60s;
  color: ${rollColor};
`

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
  let color = null;
  if (newest) {
    if (crit) {
      color = 'crit';
    }
    else if (result == 6) {
      color = 'strong';
    }
    else if (result >= 4) {
      color = 'weak';
    }
    else {
      color = 'miss';
    }
  }
  let searching = true;
  for (let i=0; i < props.result.length; i++) {
    let dieColor = 'dim';
    if (props.result[i] == result && searching) {
      if (result < 6) {
        searching = false;
      }
      dieColor = color;
    }
    dice.push(
      <Die key={i} color={dieColor}>{props.result[i]}</Die>
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
    <div className={rollClassName}>
      <Dice>
        {dice}
      </Dice>
      <Number color={color}>
        {result}
      </Number>
    </div>
  )
}

export default Roll;
