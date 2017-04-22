const actions = {
  joined: (character, state, me) => {
    const result = {characters: {[character.id]: {$set: character}}};
    console.log('joined', character, state, character.player, me);
    if (character.player == me) {
      result.mine = {$set: character.id};
    }
    return result;
  },
  left: (id, state) => {
    return {characters: {$apply: (characters) => {
      const result = Object.assign({}, characters);
      delete result[id];
      return result;
    }}};
  },
  transition: (phase) => {
    return {
      phase: {$set: phase},
      ready: {$set: false}
    };
  },
  ready: (phase) => {
    return {
      ready: {$set: true}
    }
  },
  named: ({id, name, phase}, state) => {
    const result = {
      characters: {[id]: {name: {$set: name}}}
    };
    if (phase) {
      result.phase = {$set: phase}
    }
    return result;
  },
  get_role: (killer, state) => {
    return {
      characters: {[state.mine]: {killer: {$set: killer}}},
      ready: {$set: false},
      phase: {$set: 'role'}
    }
  },
  navigate: (place) => {
    return {
      phase: {$set: place}
    }
  },
  claimed: ({id, worthy}) => {
    return {
      characters: {[id]: {
        worthy: {$set: worthy},
        dead: {$set: !worthy}
      }},
      phase: {$set: 'claimed'},
      who: {$set: id}
    }
  },
  kiss: (love, state) => {
    if (state.characters[love].killer != null) {
      return {
        phase: {$set: 'kissed'},
        who: {$set: love}
      }
    }
    return {
      kiss: {$set: love},
      phase: {$set: 'play'}
    }
  },
  cancel_kiss: () => {
    return {
      kiss: {$set: null}
    }
  },
  kissed: ({id, worthy, killer}) => {
    return {
      characters: {[id]: {
        worthy: {$set: worthy},
        killer: {$set: killer}
      }},
      kiss: {$set: null},
      phase: {$set: 'kissed'},
      who: {$set: id}
    }
  }
}

const reduce = (action, data, state, me) => {
  if (!actions[action]) {
    return null;
  }
  return actions[action](data, state, me);
}

export default reduce;
