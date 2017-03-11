
'use strict'

import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Title from 'blades/common/components/title';
import Stats from './stats/stats';
import Stress from './stress/stress-and-trauma';
import Harm from './harm/harm'
import ArmorHealing from './armor-healing/armor-healing';
import Equipment from './equipment/equipment';
import Abilities from 'blades/window/common/abilities/abilities';
import Detail from 'blades/window/common/detail';
import Friends from 'blades/window/common/friends';

import { SPECIAL_ABILITIES } from './data/special-abilities';

import Portal from 'blades/window/common/portal';
import Sheet from 'blades/window/styles/sheet';
import Row from 'common/row';
import SheetRow from 'blades/window/styles/sheet-row';
import Side from 'blades/window/styles/side';
import CommonColumn from 'common/column';

const Column = CommonColumn;
const Center = styled(Column)`
  flex: 50 1 auto;
  max-width: 50em;
`
const RightSide = styled(Side)`
  width: 13em;
  margin-left: 0;
`
const StressHarm = styled(Column)`
  flex: 1 1 23em;
  align-items: stretch;
  justify-content: space-between;
  min-width: 15em;
  max-width: 40em;
`
const MiddleRow = styled(Row)`
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`
const MiddleColumn = styled(Column)`
  flex: 1 1 0;
`
const Health = styled(Row)`
  margin: 1em;
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  flex: 3 1 25em;
`

class Character extends React.PureComponent {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update (action, value) {
    const data = {
      id: this.props.id,
      action: action
    };
    if (value != undefined) {
      data.value = value;
    }
    this.props.send(data);
  }
  render() {
    const {
      id,
      name, playbook, alias,
      look, heritage, background, vice,
      playbookXP,
      coin, stash,
      insightXP, hunt, study, survey, tinker,
      prowessXP, finesse, prowl, skirmish, wreck,
      resolveXP, attune, command, consort, sway,
      stress, trauma,
      healingUnlocked, healingClock,
      harmSevere, harmModerate1, harmModerate2, harmLesser1, harmLesser2,
      armor, heavyArmor, specialArmor,
      load, items,
      editPermission, viewPermission,
      specialAbilities, strangeFriends,
      crew,
      me, library
    } = this.props;
    let stressBonus = 0;
    let traumaBonus = 0;
    let rigging = [];
    if (crew) {
      const upgrades = Object.keys(crew.crewUpgrades);
      for (let i=0; i < upgrades.length; i++) {
        const name = upgrades[i];
        const upgrade = crew.crewUpgrades[name];
        if (upgrade.stress) {
          stressBonus += 1;
        }
        if (upgrade.trauma) {
          traumaBonus += 1;
        }
        if (upgrade.rigging) {
          rigging.push(upgrade.rigging);
        }
      }
    }
    let vigor = 0;
    let loadBonus = 0;
    const disabled = !editPermission.includes(me.id);
    for (let i=0; i < specialAbilities.length; i++) {
      const ability = specialAbilities[i];
      if (ability.vigor != undefined) {
        vigor += ability.vigor;
      }
      if (ability.load != undefined) {
        loadBonus += ability.load;
      }
    }
    const names = {name, playbook, alias};
    let mastery = false;
    if (crew && crew.trainingUpgrades && crew.trainingUpgrades["Mastery"]) {
      mastery = !!crew.trainingUpgrades["Mastery"].value
    }
    const stats = {
      coin, stash, playbookXP,
      hunt, study, survey, tinker, insightXP,
      finesse, prowl, skirmish, wreck, prowessXP,
      attune, command, consort, sway, resolveXP,
      mastery
    };
    const harm = {
      severe: harmSevere,
      moderate1: harmModerate1,
      moderate2: harmModerate2,
      lesser1: harmLesser1,
      lesser2: harmLesser2,
    };
    const armorHealing = {
      armorUsed: armor,
      armorAvailable: items.includes("Armor"),
      heavyUsed: heavyArmor,
      heavyAvailable: armor && items.includes("+Heavy"),
      specialUsed: specialArmor,
      healingClock, healingUnlocked, vigor
    };
    const equipment = {load, items, playbook, rigging, bonus: loadBonus};
    let abilityDom = null;
    if (specialAbilities.length > 0) {
      abilityDom = (
        <MiddleColumn>
          <Detail name="Special Abilities">
            <Abilities specialAbilities={specialAbilities} def={library.abilities.def}/>
          </Detail>
        </MiddleColumn>
      );
    }
    let friendDom = null;
    if (strangeFriends.length > 0) {
      friendDom = (
        <MiddleColumn>
          <Detail name="Strange Friends">
            <Friends strangeFriends={strangeFriends}/>
          </Detail>
        </MiddleColumn>
      );
    }
    return (
      <Portal>
        <Sheet>
          <Title {...names}/>
          <SheetRow>
            <Side>
              <Stats {...stats} disabled={disabled}/>
            </Side>
            <Center>
              <MiddleRow>
                <Health>
                  <StressHarm>
                    <Stress stress={stress} trauma={trauma} disabled={disabled}
                            stressBonus={stressBonus} traumaBonus={traumaBonus}/>
                    <Harm {...harm} disabled={disabled}/>
                  </StressHarm>
                  <ArmorHealing {...armorHealing} disabled={disabled}/>
                </Health>
                {abilityDom}
              </MiddleRow>
              <MiddleRow>
                {friendDom}
                <MiddleColumn>
                  <Detail name="Look">{look}</Detail>
                  <Detail name="Heritage">{heritage}</Detail>
                  <Detail name="Background">{background}</Detail>
                  <Detail name="Vice">{vice}</Detail>
                </MiddleColumn>
              </MiddleRow>
            </Center>
            <RightSide>
              <Equipment {...equipment} disabled={disabled}/>
            </RightSide>
          </SheetRow>
        </Sheet>
      </Portal>
    )
  }
};

const { number, string, array, bool, object } = React.PropTypes
Character.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  playbook: string,
  alias: string,
  look: string,
  heritage: string,
  background: string,
  vice: string,
  playbookXP: number.isRequired,
  coin: number.isRequired,
  stash: number.isRequired,
  insightXP: number.isRequired,
  hunt: number.isRequired,
  study: number.isRequired,
  survey: number.isRequired,
  tinker: number.isRequired,
  prowessXP: number.isRequired,
  finesse: number.isRequired,
  prowl: number.isRequired,
  skirmish: number.isRequired,
  wreck: number.isRequired,
  resolveXP: number.isRequired,
  attune: number.isRequired,
  command: number.isRequired,
  consort: number.isRequired,
  sway: number.isRequired,
  stress: number.isRequired,
  trauma: array.isRequired,
  healingUnlocked: bool.isRequired,
  healingClock: number.isRequired,
  harmSevere: string.isRequired,
  harmModerate1: string.isRequired,
  harmModerate2: string.isRequired,
  harmLesser1: string.isRequired,
  harmLesser2: string.isRequired,
  armor: bool.isRequired,
  heavyArmor: bool.isRequired,
  specialArmor: bool.isRequired,
  load: number.isRequired,
  items: array.isRequired,
  editPermission: array.isRequired,
  viewPermission: array.isRequired,
  specialAbilities: array.isRequired,
  strangeFriends: array.isRequired,
  me: object.isRequired,
  crew: object,
  library: object.isRequired
}

export default Character;
