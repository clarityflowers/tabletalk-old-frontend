'use strict'

import React from 'react';
import cx from 'classnames';

import {
  ITEMS, COMMON_ITEMS, PLAYBOOK_ITEMS
} from 'games/blades-in-the-dark/window/character/data/items.js';

import './equipment.scss';

const Item = (props) => {
  const { name, load, used, disabled, onClick } = props;
  let className = cx('item', {
    heavy: load == 2,
    light: load == 0,
    used
  })
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  )
}

Item.propTypes = {
  name: React.PropTypes.string.isRequired,
  load: React.PropTypes.number.isRequired,
  used: React.PropTypes.bool.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func
}

const Items = (props) => {
  const { items, update, disabled } = props;
  const add = (name) => {
    return () => {
      update({add: name});
    }
  }
  const remove = (name) => {
    return () => {
      update({remove: name});
    }
  }
  let itemDoms = [];
  for (let i=0; i < items.length; i++) {
    let item = items[i];
    let onClick = null;
    if (!disabled) {
      if (item.used) {
        onClick = remove(item.name);
      }
      else {
        onClick = add(item.name);
      }
    }
    itemDoms.push(
      <Item key={i} {...item} disabled={disabled} onClick={onClick}/>
    );
  }
  return (
    <div className='items'>
      {itemDoms}
    </div>
  );
}

Items.propTypes = {
  items: React.PropTypes.array.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  update: React.PropTypes.func.isRequired
}

const Diamond = (props) => {
  const { checked, className, name } = props;
  const properties = Object.assign({}, props);
  delete properties.checked;
  delete properties.className;
  delete properties.name
  const buttonClassName = cx('diamond', className, {checked});
  return (
    <button className={buttonClassName} {...properties}>
      <div className='container'>
        <svg x="0px"
             y="0px"
             preserveAspectRatio="none"
             width="1.2em"
             height="1.2em"
             viewBox="0 0 110 110">
          <polygon strokeWidth="10" points="55,5 5,55 55,105 105,55"/>
        </svg>
        <div className='label'>
        {name.toUpperCase()}
        </div>
      </div>
    </button>
  )
}

const Dash = (props) => {
  const { length, highlight, children } = props;
  const lengthName = 'dash-' + length;
  const className = cx('dash', lengthName, {highlight});
  return (
    <div className={className}>
      {children}
    </div>
  );
}

const Load = (props) => {
  const { load, carrying, disabled, update, clear } = props;
  const heavy = () => {
    if (load != 6) {
      update(6);
    }
  };
  const normal = () => {
    if (load != 5) {
      update(5);
    }
  };
  const light = () => {
    if (load != 3) {
      update(3);
    }
  };
  let dashes = [];
  dashes.push(
  )
  return (
    <div className='load'>
      <div className='container'>
        <button className='label' disabled={disabled} onClick={clear}>
          LOAD
        </button>
        <Dash length={carrying}>
          <div className='gap light'>
            <Diamond checked={load >= 3} onClick={light} name='light' disabled={disabled}/>
          </div>
          <div className='gap normal'>
            <Diamond checked={load >= 5} onClick={normal} name='normal' disabled={disabled}/>
          </div>
          <div className='gap heavy'>
            <Diamond checked={load >= 6} onClick={heavy} name='heavy' disabled={disabled}/>
          </div>
        </Dash>
      </div>
    </div>
  );
}

Load.propTypes = {
  load: React.PropTypes.number.isRequired,
  carrying: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  update: React.PropTypes.func.isRequired,
  clear: React.PropTypes.func.isRequired
}

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

const Equipment = (props) => {
  const { load, items, playbook, update, disabled } = props;
  const updateLoad = (load) => { update({load}); };
  const clear = () => {
    update({load: 0, items: {remove: "all"}})
  }
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
    <div className='equipment'>
      <Load load={load} carrying={carrying} disabled={disabled}
            update={updateLoad} clear={clear}/>
      <Items items={itemList} disabled={disabled} update={updateItems}/>
    </div>
  );
}

Equipment.propTypes = {
  load: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  playbook: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default Equipment;
