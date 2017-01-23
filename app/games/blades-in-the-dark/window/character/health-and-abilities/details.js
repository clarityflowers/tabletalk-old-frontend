'use strict'

import React from 'react';
import cx from 'classnames';

import StrangeFriends from './strange-friends.js';

import './details.scss';

const Icon = (props) => {
  const { isFriend } = props;
  let triangle = null;
  if (isFriend === true) {
    triangle = (
      <svg className='friend'
           x="0px"
           y="0px"
           preserveAspectRatio="none"
           width="1em"
           height="1em"
           viewBox="0 0 110 110">
        <polygon strokeWidth="10" points="5,100 105,100, 55,40"/>
      </svg>
    );
  }
  else if (isFriend === false) {
    triangle = (
      <svg className='enemy'
           x="0px"
           y="0px"
           preserveAspectRatio="none"
           width="1em"
           height="1em"
           viewBox="0 0 110 110">
        <polygon strokeWidth="10" points="5,40 105,40, 55,100"/>
      </svg>
    );
  }
  return (
    <div className='icon'>
      {triangle}
    </div>
  );
}

Icon.propTypes = {
  isFriend: React.PropTypes.bool
}

const StrangeFriend = (props) => {
  const { name, title, description, isFriend } = props;
  const className = cx('friend', {
    good: isFriend === true,
    bad: isFriend === false
  });
  return (
    <div className={className}>
      <div className='header'>
        <Icon isFriend={isFriend}/>
        <div className='names'>
          <span className='name'>{name}</span>
          <span className='title'>{title}</span>
        </div>
      </div>
      <div className='description'>{description}</div>
    </div>
  )
}

StrangeFriend.propTypes = {
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  isFriend: React.PropTypes.bool
}

const DetailBlock = (props) => {
  const { name, children } = props;
  return (
    <div className='block'>
      <div className='header'>
        {name.toUpperCase()}
      </div>
      <div className='body'>
        {children}
      </div>
    </div>
  )
}

DetailBlock.propTypes = {
  name: React.PropTypes.string.isRequired,
}

const Details = (props) => {
  const { strangeFriends, look, heritage, background, vice } = props;
  const blocks = [];
  if (strangeFriends) {
    blocks.push(
      <DetailBlock key='strange friends' name='Strange Friends'>
        <StrangeFriends strangeFriends={strangeFriends}/>
      </DetailBlock>
    )
  }
  if (look) {
    blocks.push(
      <DetailBlock key='look' name='Look'>{look}</DetailBlock>
    );
  }
  if (heritage) {
    blocks.push(
      <DetailBlock key='heritage' name='Heritage'>{heritage}</DetailBlock>
    );
  }
  if (background) {
    blocks.push(
      <DetailBlock key='background' name='Background'>{background}</DetailBlock>
    );
  }
  if (vice) {
    blocks.push(
      <DetailBlock key='vice' name='Vice'>{vice}</DetailBlock>
    );
  }
  return (
    <div className='details'>
      {blocks}
    </div>
  )
};

Details.propTypes = {
  strangeFriends: React.PropTypes.array,
  look: React.PropTypes.string,
  heritage: React.PropTypes.string,
  background: React.PropTypes.string,
  vice: React.PropTypes.string,
}

export default Details;
