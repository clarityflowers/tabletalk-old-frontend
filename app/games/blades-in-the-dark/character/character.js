'use strict'

import React from 'react';

import Portal from 'games/blades-in-the-dark/portal.js';
import Stats from './stats/stats.js';
import HealthAndItems from './health-and-items/health-and-items.js';

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
  const { id, names, stats, health, equipment, onChat, update } = props;
  const updateStats = (stats) => { update({id, stats}); }
  return (
    <Portal onChat={onChat}>
      <div className='character'>
        <Title {...names}/>
        <div className='row'>
          <Stats {...stats}
                 update={updateStats.bind(this)}/>
          <HealthAndItems {...health}
                          equipment={equipment}/>
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
  onChat: React.PropTypes.func.isRequired,
  update: React.PropTypes.func.isRequired,
}

export default Character;
