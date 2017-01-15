'use strict'

const ITEMS = {
  "+Heavy": {
    load: 2
  },
  "A Large Weapon": {
    load: 2
  },
  "Climbing Gear": {
    load: 2
  },
  "Concealed Palm Pistol": {
    load: 0
  },
  "Demolition Tools": {
    load: 2
  },
  "Fine Cover Identity": {
    load: 0
  },
  "Spiritbane Charm": {
    load: 0
  },
  "Vial of Slumber Essence": {
    load: 0
  }
}

const COMMON_ITEMS = [
  "A Blade or Two", "Throwing Knives", "A Pistol", "A 2nd Pistol",
  "A Large Weapon", "An Unusual Weapon", "Armor", "+Heavy", "Burglary Gear",
  "Climbing Gear", "Arcane Implements", "Documents", "Subterfuge Supplies",
  "Demolition Tools", "Tinkering Tools"
];

const PLAYBOOK_ITEMS = {
  "Spider": [
    "Fine Cover Identity", "Fine Bottle of Whisky", "Blueprints",
    "Vial of Slumber Essence", "Concealed Palm Pistol", "Spiritbane Charm"
  ]
};

export { ITEMS, COMMON_ITEMS, PLAYBOOK_ITEMS };
