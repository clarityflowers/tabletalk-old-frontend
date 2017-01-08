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
  return (
    <Portal onChat={props.onChat}>
      <div className='character'>
        <Title {...props.character.names}/>
        <Stats {...props.character.stats}
               coin={props.character.coin}
               stash={props.character.stash}/>
        <HealthAndItems {...props.character.health}
                        load={props.character.load}
                        items={props.character.items}/>
      </div>
    </Portal>
  )
};

export default Character;
