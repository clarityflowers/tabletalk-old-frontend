'use strict'

import React from 'react';
import styled from 'styled-components';

import Items from './items';
import Load from './load';
import Alchemy from './alchemy';

import {
  ITEMS, COMMON_ITEMS, PLAYBOOK_ITEMS
} from 'blades/window/character/data/items.js';

import arraysEqual from 'utils/arrays-equal';

const getItemsFromList = (list, items, rigging) => {
  let itemList = [];
  let carrying = 0;
  const itemsCopy = items.slice(0);
  for (let i=0; i < list.length; i++) {
    const name = list[i];
    const defItem = ITEMS[name];
    let load = 1;
    let type = null;
    if (defItem) {
      if (defItem.load != undefined) {
        load = defItem.load;
      }
      type = defItem.type;
    }
    const index = itemsCopy.indexOf(name);
    var used = false;
    if (index > -1) {
      used = true;
      itemsCopy.splice(index, 1);
    }
    let item = {
      name: name,
      load: load,
      type: type,
      used: used
    }
    itemList.push(item);
  }
  return itemList;
}

const Container = styled.div`
  flex: 1 1 auto;
`

const EquipmentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  position: relative;
  margin: 1em 0 1em 0;
`

class Equipment extends React.Component {
  shouldComponentUpdate(newProps) {
    if (
      newProps.load !== this.props.load ||
      newProps.items !== this.props.items ||
      newProps.playbook !== this.props.playbook ||
      newProps.bonus !== this.props.bonus ||
      newProps.disabled !== this.props.disabled ||
      !arraysEqual(newProps.rigging, this.props.rigging)
    ) {
      return true;
    }
    return false;
  }
  render() {
    const { load, items, playbook, bonus, rigging, disabled, bandolier1, bandolier2 } = this.props;
    var alchemy = null;

    let itemList = [];
    let carrying = 0;
    let bandoliers = 0;

    itemList = getItemsFromList(COMMON_ITEMS, items);

    const playbookItems = PLAYBOOK_ITEMS[playbook];
    if (playbookItems) {
      let result = getItemsFromList(playbookItems, items);
      itemList = itemList.concat(result);
    }

    const riggingAvailable = [];
    for (let r=0; r < rigging.length; r++) {
      riggingAvailable.push(2);
    }
    for (let i=0; i < itemList.length; i++) {
      const item = itemList[i];
      let cost = item.load;
      if (item.used) {
        let free = false;
        for (let rig=0; rig < rigging.length; rig++) {
          for (let r=0; r < rigging[rig].length; r++) {
            const match = (
              item.name.toLowerCase().includes(rigging[rig][r].toLowerCase()) || (
                item.type && item.type == rigging[rig][r]
              )
            );
            if (match) {
              if (riggingAvailable[rig] > 0) {
                cost = Math.max(0, cost - riggingAvailable);
                riggingAvailable[rig] -= item.load;
              }
            }
          }
        }
        carrying += cost;
        if (item.name == "Bandolier of Alchemicals") {
          bandoliers++;
        }
      }
    }
    if (playbook == "Leech") {
      alchemy = (
        <Alchemy bandolier1={bandolier1} bandolier2={bandolier2}
                 count={bandoliers} disabled={disabled}/>
      )
    }
    return (
      <Container>
        <EquipmentContainer>
          <Load load={load} carrying={carrying} disabled={disabled} bonus={bonus}/>
          <Items items={itemList} disabled={disabled}/>
        </EquipmentContainer>
        {alchemy}
      </Container>
    );
  }
}

const { number, array, string, bool } = React.PropTypes;
Equipment.propTypes = {
  load: number.isRequired,
  items: array.isRequired,
  playbook: string,
  bonus: number.isRequired,
  rigging: array.isRequired,
  disabled: bool.isRequired
}

export default Equipment;
