import React from 'react';
import rx from 'resplendence';

import { bonusString } from 'adventure/utils';

rx`
@import "~adventure/colors";
@import "~adventure/fonts";
`

const Container = rx('div')`
  text-align: center;
`
const Header = rx('div')`
  color: $rained-flowers-today;
`
const Dice = rx('span')`
  margin: 0 .2em;
  position: relative;
  font: $icon;
  font-size: 1.5em;
  bottom: -0.15em;
`
const Number = rx('div')`
  margin-top: .2em;
  font: $h1;
  font-size: 3em;
  text-align: center;
  color: $necessita;
  &.hit {
    color: $rained-flowers-today;
  }
  &.miss {
    color: $fireworth;
  }
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
      <Number rx={{hit: total >= 10, miss: total <= 6}}>
        {total}
      </Number>
    </Container>
  )
}

export default Roll;
