'use strict'

import React from 'react';

import Portal from '../common/portal.js';
import Stats from './stats/stats.js';
import HealthAndAbilities from './health-and-abilities/health-and-abilities.js';
import Equipment from './equipment/equipment.js';

import './character.scss';

const Title = (props) => {
  const { name, playbook, alias } = props;
  let aliasDiv = null;
  let playbookDiv = null;
  if (alias) {
    aliasDiv = (
      <div className='alias'>
        "{alias}"
      </div>
    );
  }
  if (playbook) {
    playbookDiv = (
      <div className='playbook'>
        the {props.playbook}
      </div>
    );
  }
  return (
    <div className='title'>
      <div className='name'>
        {name}
      </div>
      {playbookDiv}
      {aliasDiv}
    </div>
  );
}

Title.propTypes = {
  name: React.PropTypes.string.isRequired,
  playbook: React.PropTypes.string,
  alias: React.PropTypes.string,
}

const Character = (props) => {
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
    onChat, me, send
  } = props;
  const action = (data) => {
    data.id = id;
    send(data);
  }
  const incrementXP = (stat) => {
    return () => {
      action({action: "increment_xp", value: stat});
    }
  }
  const decrementXP = (stat) => {
    return () => {
      action({action: "decrement_xp", value: stat});
    }
  }
  const disabled = !editPermission.includes(me.id);
  const names = {name, playbook, alias}
  const stats = {
    money: {
      coin, stash,
      increment: () => { action({action: "increment_coin"}); },
      decrement: () => { action({action: "decrement_coin"}); },
      transferToStash: () => { action({action: "transfer_to_stash"}); },
      transferToCoin: () => { action({action: "transfer_to_coin"}); }
    },
    xp: playbookXP,
    increment: incrementXP('playbook'),
    decrement: decrementXP('playbook'),
    insight: {
      hunt, study, survey, tinker,
      xp: insightXP,
      increment: incrementXP('insight'),
      decrement: decrementXP('insight')
    },
    prowess: {
      finesse, prowl, skirmish, wreck,
      xp: prowessXP,
      increment: incrementXP('prowess'),
      decrement: decrementXP('prowess')
    },
    resolve: {
      attune, command, consort, sway,
      xp: resolveXP,
      increment: incrementXP('resolve'),
      decrement: decrementXP('resolve')
    },
    advanceAction: (value) => { action({action: "advance_action", value: value}); }
  }
  const health = {
    specialAbilities, strangeFriends, playbook,
    stress: {
      stress, trauma,
      increment: () => { action({action: "increment_stress"}); },
      decrement: () => { action({action: "decrement_stress"}); },
      add: (trauma) => { action({action: "add_trauma", value: trauma}); }
    },
    harm: {
      severe: harmSevere,
      moderate1: harmModerate1,
      moderate2: harmModerate2,
      lesser1: harmLesser1,
      lesser2: harmLesser2,
      edit: ({harm, text}) => { action({action: "edit_harm", value: {harm, text}}); }
    },
    healing: {
      unlocked: healingUnlocked,
      clock: healingClock,
      unlock: (value) => { action({action: "unlock_healing", value: value}); },
      increment: () => { action({action: "increment_healing"}); },
      decrement: () => { action({action: "decrement_healing"}); }
    },
    armor: {
      armor: {
        used: armor,
        available: items.includes("Armor")
      },
      heavy: {
        used: heavyArmor,
        available: armor && items.includes("+Heavy")
      },
      special: specialArmor,
      use: ({name, used}) => { action({action: "use_armor", value: {name, used}}); }
    },
    details: {
      look, heritage, background, vice,
    }
  }
  const equipment = {
    load, items, playbook,
    use: (name) => { action({action: "use_item", value: name}); },
    clear: (name) => { action({action: "clear_item", value: name}); },
    clearAll: () => { action({action: "clear_items"}); },
    setLoad: (value) => { action({action: "set_load", value: value}); }
  }
  return (
    <Portal onChat={onChat}>
      <div className='character'>
        <Title {...names}/>
        <div className='row'>
          <Stats {...stats} disabled={disabled}/>
          <div className='column'>
            <HealthAndAbilities {...health} disabled={disabled}/>
            <Equipment {...equipment} disabled={disabled}/>
          </div>
        </div>
      </div>
    </Portal>
  )
};

Character.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  playbook: React.PropTypes.string,
  alias: React.PropTypes.string,
  look: React.PropTypes.string,
  heritage: React.PropTypes.string,
  background: React.PropTypes.string,
  vice: React.PropTypes.string,
  playbookXP: React.PropTypes.number.isRequired,
  coin: React.PropTypes.number.isRequired,
  stash: React.PropTypes.number.isRequired,
  insightXP: React.PropTypes.number.isRequired,
  hunt: React.PropTypes.number.isRequired,
  study: React.PropTypes.number.isRequired,
  survey: React.PropTypes.number.isRequired,
  tinker: React.PropTypes.number.isRequired,
  prowessXP: React.PropTypes.number.isRequired,
  finesse: React.PropTypes.number.isRequired,
  prowl: React.PropTypes.number.isRequired,
  skirmish: React.PropTypes.number.isRequired,
  wreck: React.PropTypes.number.isRequired,
  resolveXP: React.PropTypes.number.isRequired,
  attune: React.PropTypes.number.isRequired,
  command: React.PropTypes.number.isRequired,
  consort: React.PropTypes.number.isRequired,
  sway: React.PropTypes.number.isRequired,
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  healingUnlocked: React.PropTypes.bool.isRequired,
  healingClock: React.PropTypes.number.isRequired,
  harmSevere: React.PropTypes.string.isRequired,
  harmModerate1: React.PropTypes.string.isRequired,
  harmModerate2: React.PropTypes.string.isRequired,
  harmLesser1: React.PropTypes.string.isRequired,
  harmLesser2: React.PropTypes.string.isRequired,
  armor: React.PropTypes.bool.isRequired,
  heavyArmor: React.PropTypes.bool.isRequired,
  specialArmor: React.PropTypes.array.isRequired,
  load: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  editPermission: React.PropTypes.array.isRequired,
  viewPermission: React.PropTypes.array.isRequired,
  specialAbilities: React.PropTypes.array.isRequired,
  strangeFriends: React.PropTypes.array.isRequired,
  onChat: React.PropTypes.func.isRequired,
  me: React.PropTypes.object.isRequired,
  send: React.PropTypes.func.isRequired
}

export default Character;
