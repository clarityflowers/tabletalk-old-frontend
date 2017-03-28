import React from 'react';
import styled from 'styled-components';
import Container from 'blades/window/styles/sheet';

import Title from 'blades/common/components/title';
import Stats from './stats/stats';
import Stress from './stress/stress-and-trauma';
import Harm from './harm/harm'
import ArmorHealing from './armor-healing/armor-healing';
import Equipment from './equipment/equipment';
import Abilities from 'blades/window/common/abilities/abilities';
import Detail from 'blades/window/common/detail';
import Friends from 'blades/window/common/friends';
import NewAbilityLink from 'blades/window/styles/new-ability-link';

import Portal from 'blades/window/common/portal';
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

class Sheet extends React.Component {
  shouldComponentUpdate(newProps) {
    return (
      newProps.character !== this.props.character ||
      newProps.me !== this.props.me ||
      newProps.library !== this.props.library ||
      newProps.off !== this.props.off ||
      newProps.disabled !== this.props.disabled
    );
  }
  render() {
    const {
      character,
      me, library,
      route, off, disabled
    } = this.props;
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
      abilities, strangeFriends,
      crew
    } = character;

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
    for (let i=0; i < abilities.length; i++) {
      const ability = abilities[i];
      const def = library.abilities.def[ability.name];
      if (def) {
        if (def.vigor != undefined) {
          vigor += def.vigor;
        }
        if (def.load != undefined) {
          loadBonus += def.load;
        }
      }
    }
    let mastery = false;
    if (crew && crew.trainingUpgrades && crew.trainingUpgrades["Mastery"]) {
      mastery = !!crew.trainingUpgrades["Mastery"].value
    }


    const armorAvailable = items.includes("Armor");
    const heavyAvailable = armor && items.includes("+Heavy");

    const names = {name, playbook, alias};

    const equipment = {load, items, playbook, rigging, bonus: loadBonus};
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
      heavyUsed: heavyArmor,
      specialUsed: specialArmor,
      armorAvailable, heavyAvailable,
      healingClock, healingUnlocked, vigor
    };

    return (
      <Portal left={off}>
        <Container>
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
                <MiddleColumn>
                  <Detail name="Special Abilities">
                    <Abilities abilities={abilities.map((a) => (a.name))} def={library.abilities.def} route={route} disabled={playbookXP < 8}/>
                  </Detail>
                </MiddleColumn>
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
        </Container>
      </Portal>
    )
  }
}

const { string, number, bool, array, object } = React.PropTypes;
Sheet.propTypes = {
  character: object.isRequired,
  me: object.isRequired,
  crew: object,
  library: object.isRequired,
  disabled: bool.isRequired,
  off: bool.isRequired,
}

export default Sheet;
