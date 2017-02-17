import React from 'react';
import { storiesOf, action, linkTo, addDecorator } from '@kadira/storybook';
import styled from 'styled-components';

import Stat from 'blades/window/character/stats/stat';
import Money from 'blades/window/character/stats/money';
import Title from 'blades/common/components/title';
import StressTrauma from 'blades/window/character/stress/stress-and-trauma';
import RepStatus from 'blades/window/crew/rep/rep-status';

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

storiesOf('Crew.rep-status', module)
  .add('default', () => (
    <RepStatus rep={3} turf={2}/>
  ))
  .add('no turf', () => (
    <RepStatus rep={7} turf={0}/>
  ))
  .add('too much turf', () => (
    <RepStatus rep={5} turf={20}/>
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
