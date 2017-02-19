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
      // let result = {rep: {$set: 0}};
      // if (!c.strong) {
      //   result.strong = {$set: true};
      // }
      // else if (c.strong && c.tier < 4) {
      //   result.strong = {$set: false};
      //   result.tier = {$set: c.tier + 1};
      // }
      // return result;
    }
  },
  decrement_rep: (c) => {
    return {
      rep: {$set: c.rep - 1}
    }
  },
  toggle_claim: (ch, {r, c}) => {
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
    console.error(`"${action}" is not a valid crew action`);
  }
  return params;
}

export default reduce;
