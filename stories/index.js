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
import Claim from 'blades/window/crew/claims/claim';
import Claims from 'blades/window/crew/claims/claims';
import Cohort from 'blades/window/crew/cohorts/cohort';
import Upgrade from 'blades/window/crew/upgrades/upgrade';
import Upgrades from 'blades/window/crew/upgrades/upgrades';

import upgrades from './data/upgrades';
import claims from './claims';

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
  background: ${darken(Colors.stone, 0.15)};
  font-size: 40px;
`
const Border = styled.div`
  background: ${Colors.stone};
  outline: 2px solid ${Colors.sun};
`
const Container = styled.div`
  margin: 50px;
`
const Small = styled.div`
  font-size: .5em;
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

storiesOf('Crew.claims', module)
  .add('owned claim', () => (
    <Claim name="Loyal Fence" description="*+2 coin* for burglary or robbery"
           owned={true} disabled={false}/>
  ))
  .add('unowned claim', () => (
    <Claim name="Hagfish Farm"
      description="Body disposal, *+1d* to reduce heat after killing"
           owned={false} disabled={false}/>
  ))
  .add('turf', () => (
    <Claim name="Turf" owned={true} disabled={false}/>
  ))
  .add('claims', () => (
    <Small>
      <Claims {...claims} disabled={false}/>
    </Small>
  ))

storiesOf('Crew.cohort', module)
  .add('with description', () => (
    <Cohort id={1} name="Zopheea" kind="Burglar" isGang={false} quality={5} weak={true}
            impaired={false}
            broken={true} armor={false} edges={["Fearsome", "Loyal"]}
            flaws={["Unreliable", "Principled"]}
            description="None other than the INFAMOUS ZOPHEEA"
            disabled={false}/>
  ))
  .add('zero quality', () => (
    <Cohort id={2} name="Friends" kind="Thugs" isGang={true} quality={0} weak={false} impaired={true}
            broken={false} armor={true} edges={["Independant"]}
            flaws={["Savage"]}
            description="A gang of friendly individuals"
            disabled={false}/>
  ))
  .add('long name', () => (
    <Cohort id={2} name="Gang of Irreputable Miscreants" kind="Skulks" isGang={true}
            quality={2} weak={false} impaired={true}
            broken={false} armor={true} edges={["Fearsome"]}
            flaws={["Unreliable"]}
            description="A gang of even more friendly individuals"
            disabled={false}/>
  ))
  .add('no name & disabled', () => (
    <Cohort id={2} kind="Adepts" isGang={true}
            quality={3} weak={true} impaired={true}
            broken={false} armor={true} edges={["Tenacious"]}
            flaws={["Wild"]}
            description="Some perfectly ordinary friends with nothing strange about them whatsoever, nosirree"
            disabled={true}/>
  ))

storiesOf('Crew.upgrade', module)
  .add('unchecked', () => (
    <Upgrade name="Documents" value={0} available={0} disabled={false}/>
  ))
  .add('checked', () => (
    <Upgrade name="Pet/Special" value={1} available={0} disabled={false}/>
  ))
  .add('unlocked', () => (
    <Upgrade name="Workshop" value={0} available={1} disabled={false}/>
  ))
  .add('x2 value = 0', () => (
    <Upgrade name="Vault" value={0} max={2} available={0} disabled={false}/>
  ))
  .add('x2 value = 1', () => (
    <Upgrade name="Carriage" value={1} max={2} available={0} disabled={false}/>
  ))
  .add('x2 value = 2', () => (
    <Upgrade name="Boat" value={2} max={2} available={0} disabled={false}/>
  ))
  .add('x2 unlocked value = 0', () => (
    <Upgrade name="Secure" value={0} max={2} available={1} disabled={false}/>
  ))
  .add('x2 unlocked value = 1', () => (
    <Upgrade name="Carriage" value={1} max={2} available={1} disabled={false}/>
  ))
  .add('x2 unlocked value = 2', () => (
    <Upgrade name="Boat" value={2} max={2} available={1} disabled={false}/>
  ))
  .add('steady value = 0', () => (
    <Upgrade name="Steady" value={0} cost={3} available={0} disabled={false}
             stress={true}/>
  ))
  .add('steady value = 1', () => (
    <Upgrade name="Steady" value={1} cost={3} available={0} disabled={false}
             stress={true}/>
  ))
  .add('cost = 4, value = 1', () => (
    <Upgrade name="Mastery" value={1} cost={4} available={0} disabled={false}/>
  ))
  .add('rigging', () => (
    <Upgrade name="Thief Rigging" value={1} available={0} disabled={false}
             rigging={["tools", "gear"]}/>
  ))


storiesOf('Crew.upgrades', module)
  .add('0 available', () => (
    <Upgrades upgrades={upgrades.training} available={0} disabled={false}/>
  ))
  .add('1 available', () => (
    <Upgrades upgrades={upgrades.crew} available={1} disabled={false}/>
  ))
  .add('1 available, disabled', () => (
    <Upgrades upgrades={upgrades.lair} available={1} disabled={true}/>
  ))
