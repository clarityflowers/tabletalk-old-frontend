'use strict'

import React from 'react';
import styled from 'styled-components';

import Item from './item';

const Container = styled.div`
  min-width: 12.5em;
  width: 12.5em;
  font-size: .8em;
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  height: 100%;
`

class Items extends React.PureComponent {
  render() {
    const { items, use, clear, disabled } = this.props;
    let itemDoms = [];
    for (let i=0; i < items.length; i++) {
      itemDoms.push(
        <Item key={i} {...items[i]} disabled={disabled}/>
      );
    }
    return (
      <Container>
        {itemDoms}
      </Container>
    );
  }
}

Items.propTypes = {
  items: React.PropTypes.array.isRequired,
  disabled: React.PropTypes.bool.isRequired,
}

export default Items;
