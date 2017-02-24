'use strict'

import React from 'react';
import styled from 'styled-components';

import Items from './items';
import Load from './load';

import {
  ITEMS, COMMON_ITEMS, PLAYBOOK_ITEMS
} from 'blades/window/character/data/items.js';

const getItemsFromList = (list, items) => {
  let itemList = [];
  let carrying = 0;
  for (let i=0; i < list.length; i++) {
    const name = list[i];
    const defItem = ITEMS[name];
    let load = 1;
    if (defItem) {
      if (defItem.load != undefined) {
        load = defItem.load;
      }
    }
    const used = items.includes(name);
    if (used) { carrying += load; }
    let item = {
      name: name,
      load: load,
      used: items.includes(name)
    }
    itemList.push(item);
  }
  return { itemList, carrying };
}

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  position: relative;
  flex: 1 1 auto;
  margin: 1em 0 2em 0;
`

const Equipment = (props) => {
  const { load, items, playbook, bonus, disabled } = props;
  let itemList = [];
  let carrying = 0;

  let result = getItemsFromList(COMMON_ITEMS, items);
  itemList = itemList.concat(result.itemList);
  carrying += result.carrying;

  const playbookItems = PLAYBOOK_ITEMS[playbook];
  if (playbookItems) {
    let result = getItemsFromList(playbookItems, items);
    itemList = itemList.concat(result.itemList);
    carrying += result.carrying;
  }

  return (
    <Container>
      <Load load={load} carrying={carrying} disabled={disabled} bonus={bonus}/>
      <Items items={itemList} disabled={disabled}/>
    </Container>
  );
}

const { number, array, string, bool } = React.PropTypes;
Equipment.propTypes = {
  load: number.isRequired,
  items: array.isRequired,
  playbook: string,
  disabled: bool.isRequired,
  bonus: number.isRequired
}

export default Equipment;
