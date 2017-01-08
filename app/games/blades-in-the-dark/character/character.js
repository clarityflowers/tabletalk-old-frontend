'use strict'

import React from 'react';

import Portal from 'games/blades-in-the-dark/portal.js';
import Stats from './stats/stats.js';
import HealthAndItems from './health-and-items/health-and-items.js';

import './character.scss';

const Title = (props) => {
  let alias = null;
  if (props.alias) {
    alias = (
      <div className='alias'>
        "{props.alias}"
      </div>
    )
  }
  return (
    <div className='title'>
      <div className='name'>
        {props.name}
      </div>
      <div className='playbook'>
        the {props.playbook}
      </div>
      {alias}
    </div>
  );
}

Title.propTypes = {
  name: React.PropTypes.string.isRequired,
  playbook: React.PropTypes.string.isRequired,
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
