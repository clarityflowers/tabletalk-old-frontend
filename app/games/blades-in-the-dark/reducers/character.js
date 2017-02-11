'use strict'

import update from 'react-addons-update';

const actions = {
  increment_stress: (c) => {
    if (c.stress < 9) {
      return {stress: {$set: c.stress + 1}};
    }
  },
  decrement_stress: (c) => {
    if (c.stress > 0) {
      return {stress: {$set: c.stress - 1}};
    }
  },
  add_trauma: (c, trauma) => {
    return {
      trauma: {$push: [trauma]},
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
  increment_xp: (c, value) => {
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
  decrement_xp: (c, value) => {
    const stat = value.toLowerCase();
    const prop = stat + 'XP';
    if (c[prop] > 0) {
      return {[prop]: {$set: c[prop] - 1}};
    }
  },
  advance_action: (c, value) => {
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
  edit_harm: (c, {harm, text}) => {
    let params = {};
    const prop = "harm" + harm[0].toUpperCase() + harm.slice(1).toLowerCase();
    params[prop] = {$set: text};
    if (!c[prop] && text) {
      params.healingUnlocked = {$set: false};
    }
    return params;
  },
  use_armor: (c, {name, used}) => {
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
  unlock_healing: (c, unlocked) => {
    return {healingUnlocked: {$set: unlocked}};
  },
  increment_healing: (c) => {
    if (c.healingClock < 4) {
      return {healingClock: {$set: c.healingClock + 1}};
    }
    else {
      return {
        healingClock: {$set: 0},
        harmSevere: {$set: ""},
        harmModerate1: {$set: ""},
        harmModerate2: {$set: ""},
        harmLesser1: {$set: ""},
        harmLesser2: {$set: ""},
        healingUnlocked: {$set: false}
      };
    }
  },
  decrement_healing: (c) => {
    if (c.healingClock > 0) {
      return {healingClock: {$set: c.healingClock - 1}};
    }
  },
  use_item: (c, name) => {
    if (!c.items.includes(name)) {
      let array = [name];
      if (name == "+Heavy" && !c.items.includes("Armor")) {
        array.push("Armor");
      }
      return {items: {$push: array}};
    }
  },
  clear_item: (c, name) => {
    const index = c.items.indexOf(name);
    if (index >= 0) {
      let params = {};
      let items = c.items.slice(0);
      items.splice(index, 1);
      if (name == "Armor") {
        params.armor = {$set: false};
        params.heavyArmor = {$set: false};
        const index = items.indexOf("+Heavy");
        if (index >= 0) {
          items.splice(index, 1);
        }
      }
      if (name == "+Heavy") {
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
  set_load: (c, value) => {
    return {load: {$set: value}};
  }
}

const reduce = ({action, id, value}) => {
  let params = {};
  if (action in actions) {
    if (action == "create") {
    }
    else {
      params = {$apply: c => {
        let result = c;
        if (c != null) {
          const params = actions[action](c, value);
          if (params) {
            result = update(c, params);
          }
        }
        return result;
      }};
    }
    params = {[id]: params};
  }
  else {
    console.error(`"${action}" is not a valid character action`);
  }
  return params;
}

export default reduce;
