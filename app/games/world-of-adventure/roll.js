import React from 'react';
import styled from 'styled-components';

import cx from 'classnames';
import { bonusString } from 'games/world-of-adventure/utils';
import Fonts from 'games/world-of-adventure/fonts';
import Colors from 'games/world-of-adventure/colors';

const { fireworth, rainedFlowersToday, necessita } = Colors;

const Container = styled.div`
  text-align: center;
`
const Header = styled.div`
  color: ${rainedFlowersToday};
`
const Dice = styled.span`
  margin: 0 .2em;
  position: relative;
  font: ${Fonts.icon};
  font-size: 1.5em;
  bottom: -0.15em;
`
const numberColor = ({color}) => {
  if (color == 'hit') {
    return rainedFlowersToday;
  }
  else if (color == 'miss') {
    return fireworth;
  }
  else {
    return necessita;
  }
}
const Number = styled.div`
  margin-top: .2em;
  font: ${Fonts.h1};
  font-size: 3em;
  text-align: center;
  color: ${numberColor};
`
/* -----loading, for when this is implemented ----
.loading {
  -webkit-transform-origin: 50% calc(50% + .8px);
  transform-origin: 50% calc(50% + 0.8px);
  display: inline-block;
  text-align: center;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  color: $rained-flowers-today;
  font-family: 'Icomoon';
  // animation: spin 1s infinite linear;
  animation: spin 1s infinite cubic-bezier(.5, -0.3, .5, 0.3);
}
*/

let Roll = (props) => {
  let total = props.result[0] + props.result[1] + props.bonus;
  let bonus = bonusString(props.bonus);
  let color = null;
  if (total >= 10) {
    color = 'hit';
  }
  else if (total <= 6) {
    color = 'miss';
  }
  if (props.result[0] == 0 && props.result[1] == 0) {
    total = (
      <div className='loading'>l</div>
    )
  }
  return (
    <Container>
      <Header>
        {props.name} rolled
        <Dice>
          {props.result[0]}
          {props.result[1]}
        </Dice>
        {bonus}
      </Header>
      <Number color={color}>
        {total}
      </Number>
    </Container>
  )
}

export default Roll;
