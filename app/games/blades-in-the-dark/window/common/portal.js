'use strict'

import React from 'react';
import styled from 'styled-components';

import Colors from 'games/blades-in-the-dark/common/colors';

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  flex: 1 1 auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1em 1em 3em 1em;
  &::-webkit-scrollbar-thumb {
    background: ${Colors.sun};
  }
`

const Portal = (props) => {
  return (
    <div className='portal'>
      {props.children}
    </div>
  );
}

export default Portal;
