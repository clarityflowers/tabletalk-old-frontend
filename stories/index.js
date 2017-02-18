import React from 'react';
import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';
import styled from 'styled-components';

import Stat from 'blades/window/character/stats/stat';
import Money from 'blades/window/character/stats/money';
import Title from 'blades/common/components/title';
import StressTrauma from 'blades/window/character/stress/stress-and-trauma';
import Rep from 'blades/window/crew/rep';
import Tier from 'blades/window/crew/tier';
import Heat from 'blades/window/crew/heat';
import Vaults from 'blades/window/crew/vaults';

import Colors from 'blades/common/colors';
import { darken } from 'utils/color-tools';
import Dispatcher from 'utils/dispatcher';

import './styling.scss';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: h;
  background: ${darken(Colors.stone, 0.15)};
`
const Border = styled.div`
  background: ${Colors.stone};
  outline: 2px solid ${Colors.sun};
  font-size: 40px;
`
const Container = styled.div`
  overflow: hidden;
  margin: 50px;
`

addDecorator((story) => (
  <Wrapper>
    <Border>
      <Container>
        <Dispatcher dispatch={action('dispatch')}>
          {story()}
        </Dispatcher>
      </Container>
    </Border>
  </Wrapper>
));

const actions = {
  finesse: 2,
  prowl: 1,
  skirmish: 0,
  wreck: 4
}

storiesOf('Common.title', module)
  .add('Character with alias', () => (
    <Title name="Kobbal" playbook="Cutter" alias="Boldur"/>
  ))
  .add('Character without alias', () => (
    <Title name="Qarin" playbook="Spider"/>
  ))
  .add('Crew', () => (
    <Title name="The Quicksilver Crew" playbook="Assassins" crew/>
  ))

storiesOf('Character.stat', module)
  .add('default', () => (
    <Stat name="Prowess" xp={3} disabled={false} {...actions}/>
  ))
  .add('full xp', () => (
    <Stat name="Prowess" xp={6} disabled={false} {...actions}/>
  ))

storiesOf('Character.money', module)
  .add('default', () => (
    <Money coin={2} stash={24} disabled={false}/>
  ))

storiesOf('Character.stress-and-trauma', module)
  .add('default', () => (
    <StressTrauma stress={3} trauma={["Haunted"]} disabled={false}/>
  ))
  .add('max stress', () => (
    <StressTrauma stress={9} trauma={[]} disabled={false}/>
  ))

storiesOf('Crew.rep', module)
  .add('default', () => (
    <Rep rep={3} turf={2} disabled={false}/>
  ))
  .add('no turf', () => (
    <Rep rep={7} turf={0} disabled={false}/>
  ))
  .add('too much turf', () => (
    <Rep rep={5} turf={20} disabled={false}/>
  ))
  .add('disabled', () => (
    <Rep rep={2} turf={2} disabled={true}/>
  ))

storiesOf('Crew.tier', module)
  .add('weak', () => (
    <Tier tier={2} strong={false}/>
  ))
  .add('strong', () => (
    <Tier tier={0} strong={true}/>
  ))

storiesOf('Crew.heat', module)
  .add('default', () => (
    <Heat heat={2} wantedLevel={1} disabled={false}/>
  ))
  .add('disabled', () => (
    <Heat heat={5} wantedLevel={4} disabled={true}/>
  ))

storiesOf('Crew.coin', module)
  .add('no vaults', () => (
    <Vaults coin={3} vaults={0} disabled={false}/>
  ))
  .add('one vault', () => (
    <Vaults coin={7} vaults={1} disabled={false}/>
  ))
  .add('two vaults', () => (
    <Vaults coin={12} vaults={2} disabled={false}/>
  ))
  .add('coin over', () => (
    <Vaults coin={12} vaults={0} disabled={false}/>
  ))
  .add('disabled', () => (
    <Vaults coin={5} vaults={2} disabled={true}/>
  ))
  .add('edge', () => (
    <Vaults coin={8} vaults={1} disabled={false}/>
  ))

// storiesOf('Welcome', module)
//   .add('to Storybook', () => (
//     <Welcome showApp={linkTo('Button')}/>
//   ));
//
// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));
