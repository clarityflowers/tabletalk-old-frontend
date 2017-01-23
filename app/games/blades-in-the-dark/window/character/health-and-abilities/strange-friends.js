'use strict'

import React from 'react';
import cx from 'classnames';

import './strange-friends.scss';

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
        <div className='name'>{name}</div>
        <div className='title'>{title}</div>
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

const StrangeFriends = (props) => {
  const { strangeFriends } = props;
  let friends = [];
  for (let i=0; i < strangeFriends.length; i++) {
    const friend = strangeFriends[i];
    friends.push(
      <StrangeFriend key={i} {...friend}/>
    )
  }
  return (
    <div className='strange-friends'>
      {friends}
    </div>
  )
};

StrangeFriends.propTypes = {
  strangeFriends: React.PropTypes.array.isRequired
}

export default StrangeFriends;
