
'use strict'

import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Sheet from './sheet/sheet';
import NewAbility from 'blades/window/common/pages/new-ability/new-ability';


const Container = styled.div`
  width: 100%;
  height: 100%;
`

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  shouldComponentUpdate(newProps) {
    if (
      newProps.character !== this.props.character ||
      !newProps.route.equals(this.props.route) ||
      newProps.library !== this.props.library
    ) {
      return true;
    }
    return false;
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
      character,
      me, library,
      route
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
      editPermission, viewPermission,
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
    const disabled = !editPermission.includes(me.id);
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


    let portal = 'sheet';
    if (!route.isExact) {
      if (
        route.nextName == 'new_ability' &&
        !disabled &&
        playbookXP >= 8
      ) {
        portal = 'new_ability';
      }
    }
    const nextRoute = route.push(portal);


    const sheetProps = {
      armorAvailable: items.includes("Armor"),
      heavyAvailable: armor && items.includes("+Heavy"),
      name, playbook, alias,
      look, heritage, background, vice,
      playbookXP,
      coin, stash,
      insightXP, hunt, study, survey, tinker,
      prowessXP, finesse, prowl, skirmish, wreck,
      resolveXP, attune, command, consort, sway,
      mastery,
      stress, trauma, stressBonus, traumaBonus,
      healingUnlocked, healingClock, vigor,
      harmSevere, harmModerate1, harmModerate2, harmLesser1, harmLesser2,
      armor, heavyArmor, specialArmor,
      load, items, rigging, loadBonus,
      abilities, strangeFriends,
      crew,
      me, library,
      route, disabled,
      off: portal != 'sheet'
    }
    const abilityProps = {
      abilities, playbook,
      library: library.abilities,
      off: portal != 'new_ability',
      route: nextRoute
    }

    return (
      <Container>
        <Sheet {...sheetProps}/>
        <NewAbility {...abilityProps}/>
      </Container>
    )
  }
};

const { number, string, array, bool, object } = React.PropTypes
Character.propTypes = {
  character: object.isRequired,
  me: object.isRequired,
  library: object.isRequired
}

export default Character;
