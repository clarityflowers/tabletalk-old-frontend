'use strict'

import React from 'react';
import styled from 'styled-components';

import Items from './items';
import Load from './load';

import {
  ITEMS, COMMON_ITEMS, PLAYBOOK_ITEMS
} from 'games/blades-in-the-dark/window/character/data/items.js';

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
  margin: 1em 0 2em .5em;
`

const Equipment = (props) => {
  const {
    load, items, playbook,
    use, clear, clearAll, setLoad,
    disabled
  } = props;
  const updateLoad = (load) => { update({load}); };
  const updateItems = (items) => { update({items}); };
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
      <Load load={load} carrying={carrying} disabled={disabled}
            set={setLoad} clear={clearAll}/>
      <Items items={itemList} disabled={disabled} use={use} clear={clear}/>
    </Container>
  );
}

Equipment.propTypes = {
  load: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  playbook: React.PropTypes.string,
  disabled: React.PropTypes.bool.isRequired
}

export default Equipment;
