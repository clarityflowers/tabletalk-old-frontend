'use strict'

import update from 'react-addons-update';

const turf = (c) => {
  let turf = 0;
  for (let r=0; r < c.claims.claims.length; r++) {
    const row = c.claims.claims[r];
    for (let c=0; c < row.length; c++) {
      const claim = row[c];
      if (claim.owned && claim.name == 'Turf') {
        turf++;
      }
    }
  }
  return turf;
}

const actions = {
  increment_heat: (c) => {
    if (c.heat < 8) {
      return {heat: {$set: c.heat + 1}};
    }
    else if (c.heat == 8) {
      var result = {heat: {$set: 0}};
      if (c.wantedLevel < 4) {
        result.wantedLevel = {$set: c.wantedLevel + 1};
      }
      return result;
    }
  },
  decrement_heat: (c) => {
    if (c.heat > 0) {
      return {heat: {$set: c.heat - 1}};
    }
  },
  serve_time: (c) => {
    if (c.wantedLevel > 0) {
      return {
        heat: {$set: 0},
        wantedLevel: {$set: c.wantedLevel - 1}
      }
    }
  },
  increment_coin: (c) => {
    return {
      coin: {$set: c.coin + 1}
    }
  },
  decrement_coin: (c) => {
    return {
      coin: {$set: c.coin - 1}
    }
  },
  increment_rep: (c) => {
    const target = 12 - turf(c);
    if (c.rep < target) {
      return {rep: {$set: c.rep + 1}};
    }
    if (c.rep == target) {
      if (!c.strong) {
        let result = {
          rep: {$set: 0},
          strong: {$set: true}
        };
      }
      return result;
    }
  },
  decrement_rep: (c) => {
    return {
      rep: {$set: c.rep - 1}
    }
  },
  toggle_claim: (ch, {value}) => {
    const { r, c } = value;
    return {
     claims: {
       claims: {
         [r]: {
           [c]: {
             owned: {
               $apply: (owned) => (!owned)
             }
           }
         }
       }
     }
    }
  },
  decrement_xp: (c) => {
    if (c.xp > 0) {
      return {xp: {$set: c.xp - 1}};
    }
  },
  cohort: (c, props) => {
    let { id, field, value } = props.value;
    if (["weak", "impaired", "broken", "armor"].includes(field)) {
      let index = null;
      for (let i=0; i < c.cohorts.length; i++) {
        const cohort = c.cohorts[i];
        if (cohort.id == id) {
          index = i;
        }
      }
      if (index != null) {
        return { cohorts: {[index]: {[field]: {$set: value}}}}
      }
    }
  },
  add_upgrade: (c, {value}) => {
    const name = value;
    let result = null;
    let category = null;
    if (c.crewUpgrades[name]) {
      category = 'crewUpgrades';
    }
    else if (c.lairUpgrades[name]) {
      category = 'lairUpgrades';
    }
    else if (c.qualityUpgrades[name]) {
      category = 'qualityUpgrades';
    }
    else if (c.trainingUpgrades[name]) {
      category = 'trainingUpgrades';
    }
    if (category) {
      const upgrade = c[category][name];
      const max = upgrade.max || 1;
      const value = upgrade.value;
      const cost = upgrade.cost || 1;
      if (value < max && c.availableUpgrades >= cost) {
        return {
          [category]: {[name]: {value: {$set: value + 1}}},
          availableUpgrades: {$set: c.availableUpgrades - cost}
        }
      }
    }
  },
  add_ability: (c, {value}) => {
    const name = value;
    if (c.availableUpgrades > 2) {
      return {
        abilities: {$push: [value]},
        availableUpgrades: {$apply: (value) => value - 2}
      };
    }
  }
}

const reduce = ({action, id, value}) => {
  return (state) => {
    if (action == "create") {
    }
    else {
      const crew = state.crews[id];
      const params = {};
      const result = {};
      if (action == "increment_xp") {
        if (crew.xp < 7) {
          params[id] = {xp: {$apply: (xp) => (xp + 1)}};
        }
        else {
          const characterParams = {};
          params[id] = {
            xp: {$set: 0},
            availableUpgrades: {$apply: (up) => (up + 2)}
          };
          result.characters = {};
          const characterIds = Object.keys(state.characters);
          for (let i=0; i < characterIds.length; i++) {
            const characterId = characterIds[i];
            const character = state.characters[characterId];
            if (character.crewId == id && character) {
              characterParams[characterId] = {
                stash: {
                  $apply: (stash) => (stash + 1 + (2 * crew.tier))
                }
              };
            }
          }
          result.characters = update(state.characters, characterParams);
        }
      }
      else if (action in actions) {
        let result = crew;
        if (crew != null) {
          const crewParams = actions[action](crew, {value});
          if (crewParams) {
            result = update(crew, crewParams);
          }
        }
        params[id] = {$set: result};
      }
      else {
        console.error(`"${action}" is not a valid crew action`);
      }
      result.crews = update(state.crews, params);
      return result;
    }
  }
}

export default reduce;
