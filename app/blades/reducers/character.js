'use strict'

import update from 'react-addons-update';

const vigor = (c, library) => {
  for (let i=0; i < c.abilities.length; i++) {
    const ability = c.abilities[i];
    const def = library[ability.name];
    if (def && def.vigor) {
      return 1;
    }
  }
  return 0;
}

const actions = {
  increment_stress: (c, {crew}) => {
    let bonus = 0;
    if (crew) {
      const upgrades = Object.keys(crew.crewUpgrades);
      for (let i=0; i < upgrades.length; i++) {
        const name = upgrades[i];
        const upgrade = crew.crewUpgrades[name];
        if (upgrade.stress) {
          bonus++;
        }
      }
    }
    if (c.stress < 9 + bonus) {
      return {stress: {$set: c.stress + 1}};
    }
  },
  decrement_stress: (c) => {
    if (c.stress > 0) {
      return {stress: {$set: c.stress - 1}};
    }
  },
  add_trauma: (c, {value}) => {
    return {
      trauma: {$push: [value]},
      stress: {$set: 0}
    };
  },
  increment_coin: (c) => {
    if (c.coin < 4) {
      return {coin: {$set: c.coin + 1}};
    }
  },
  decrement_coin: (c) => {
    if (c.coin > 0) {
      return {coin: {$set: c.coin - 1}};
    }
  },
  transfer_to_stash: (c) => {
    if (c.stash < 40 && c.coin > 0) {
      return {
        coin: {$set: c.coin - 1},
        stash: {$set: c.stash + 1}
      }
    }
  },
  transfer_to_coin: (c) => {
    if (c.stash >= 2 && c.coin < 4) {
      return {
        coin: {$set: c.coin + 1},
        stash: {$set: c.stash - 2}
      }
    }
  },
  increment_xp: (c, {value}) => {
    const stat = value.toLowerCase();
    if (stat == 'playbook') {
      if (c.playbookXP < 8) {
        return {playbookXP: {$set: c.playbookXP + 1}};
      }
    }
    else {
      const prop = stat + 'XP';
      if (c[prop] < 6) {
        return {[prop]: {$set: c[prop] + 1}};
      }
    }
  },
  decrement_xp: (c, {value}) => {
    const stat = value.toLowerCase();
    const prop = stat + 'XP';
    if (c[prop] > 0) {
      return {[prop]: {$set: c[prop] - 1}};
    }
  },
  advance_action: (c, {value}) => {
    const stat = value.toLowerCase();
    if (c[stat] < 4) {
      let xp = "";
      if (["hunt", "study", "survey", "tinker"].includes(stat)) {
        xp = "insightXP";
      }
      if (["finesse", "prowl", "skirmish", "wreck"].includes(stat)) {
        xp = "prowessXP";
      }
      if (["attune", "command", "consort", "sway"].includes(stat)) {
        xp = "resolveXP";
      }
      return {
        [stat]: {$set: c[stat] + 1},
        [xp]: {$set: 0}
      };
    }
  },
  edit_harm: (c, {value}) => {
    const { harm, text } = value;
    let params = {};
    const prop = "harm" + harm[0].toUpperCase() + harm.slice(1).toLowerCase();
    params[prop] = {$set: text};
    if (!c[prop] && text) {
      params.healingUnlocked = {$set: false};
    }
    return params;
  },
  use_armor: (c, {value}) => {
    const { name, used } = value;
    if (name == "armor") {
      let params = {armor: {$set: used}};
      if (!used) {
        params.heavyArmor = {$set: false};
      }
      return params;
    }
    else if (name == "heavy") {
      return {heavyArmor: {$set: used}};
    }
    else if (name == "special") {
      return {specialArmor: {$set: used}}
    }
  },
  unlock_healing: (c, {value}) => {
    return {healingUnlocked: {$set: value}};
  },
  increment_healing: (c, {library}) => {
    if (c.healingClock < 4) {
      return {healingClock: {$set: c.healingClock + 1}};
    }
    else {
      return {
        healingClock: {$set: vigor(c, library.abilities.def)},
        harmSevere: {$set: ""},
        harmModerate1: {$set: ""},
        harmModerate2: {$set: ""},
        harmLesser1: {$set: ""},
        harmLesser2: {$set: ""},
        healingUnlocked: {$set: false}
      };
    }
  },
  decrement_healing: (c, {library}) => {
    if (c.healingClock > vigor(c, library.abilities.def)) {
      return {healingClock: {$set: c.healingClock - 1}};
    }
  },
  use_item: (c, {value}) => {
    if (!c.items.includes(value)) {
      let array = [value];
      if (value == "+Heavy" && !c.items.includes("Armor")) {
        array.push("Armor");
      }
      return {items: {$push: array}};
    }
  },
  clear_item: (c, {value}) => {
    const index = c.items.indexOf(value);
    if (index >= 0) {
      let params = {};
      let items = c.items.slice(0);
      items.splice(index, 1);
      if (value == "Armor") {
        params.armor = {$set: false};
        params.heavyArmor = {$set: false};
        const index = items.indexOf("+Heavy");
        if (index >= 0) {
          items.splice(index, 1);
        }
      }
      if (value == "+Heavy") {
        params.heavyArmor = {$set: false};
      }
      params.items = {$set: items};
      return params;
    }
  },
  clear_items: (c) => {
    let params = {
      items: {$set: []},
      load: {$set: 0},
      armor: {$set: false},
      heavyArmor: {$set: false}
    }
    params.specialArmor = {};
    for (let i=0; i < c.specialArmor.length; i++) {
      params.specialArmor[i] = {used: {$set: false}};
    }
    return params;
  },
  set_load: (c, {value}) => {
    return {load: {$set: value}};
  },
  add_ability: (c, {value}) => {
    const { name, veteran } = value;
    if (c.playbookXP >= 8) {
      return {
        abilities: {$push: [value]},
        playbookXP: {$set: 0}
      };
    }
  }
}

const reduce = ({action, id, value}) => {
  return (state) => {
    let params = {};
    if (action in actions) {
      if (action == "create") {
      }
      else {
        const character = state.characters[id];
        const crew = state.crews[character.crewId];
        const library = state.library.character;
        let result = character;
        if (character != null) {
          const params = actions[action](character, {value, crew, library});
          if (params) {
            result = update(character, params);
          }
        }
        params = {$set: result};
      }
      params = {[id]: params};
    }
    else {
      console.error(`"${action}" is not a valid character action`);
    }
    return {
      characters: update(state.characters, params)
    }
  }
}

export default reduce;
