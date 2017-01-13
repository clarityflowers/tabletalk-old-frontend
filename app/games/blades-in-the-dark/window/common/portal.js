'use strict'

import React from 'react';
import './portal.scss';

const Portal = (props) => {
  return (
    <div className='portal'>
      {props.children}
    </div>
  );
}

export default Portal;
