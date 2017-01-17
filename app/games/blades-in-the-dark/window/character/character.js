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
    id, names, stats, health, equipment, specialAbilities, strangeFriends,
    details, permissions,
    onChat, update, me
  } = props;
  const disabled = !permissions.edit.includes(me.id);
  const updateStats = (stats) => { update({id, stats}); }
  const updateHealth = (health) => { update({id, health}); }
  const updateEquipment = (equipment) => { update({id, equipment}); }
  return (
    <Portal onChat={onChat}>
      <div className='character'>
        <Title {...names}/>
        <div className='row'>
          <Stats {...stats}
                 disabled={disabled}
                 update={updateStats.bind(this)}/>
          <div className='column'>
            <HealthAndAbilities {...health}
                            disabled={disabled}
                            specialAbilities={specialAbilities}
                            update={updateHealth.bind(this)}
                            playbook={names.playbook}
                            strangeFriends={strangeFriends}
                            details={details}/>
            <Equipment {...equipment}
                       update={updateEquipment.bind(this)}
                       disabled={disabled}
                       playbook={names.playbook}/>
          </div>
        </div>
      </div>
    </Portal>
  )
};

Character.propTypes = {
  id: React.PropTypes.any.isRequired,
  names: React.PropTypes.object.isRequired,
  stats: React.PropTypes.object.isRequired,
  health: React.PropTypes.object.isRequired,
  equipment: React.PropTypes.object.isRequired,
  strangeFriends: React.PropTypes.object.isRequired,
  details: React.PropTypes.object.isRequired,
  permissions: React.PropTypes.object.isRequired,
  onChat: React.PropTypes.func.isRequired,
  update: React.PropTypes.func.isRequired,
  me: React.PropTypes.object.isRequired
}

export default Character;
