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
  "Concealed Palm Blaster": {
    load: 0
  },
  "Demolition Tools": {
    load: 2
  },
  "Fine Clothes & Jewelry": {
    load: 0
  },
  "Fine Cover Identity": {
    load: 0
  },
  "Fine Heavy Weapon": {
    load: 2
  },
  "Fine Loaded Dice, Trick Cards": {
    load: 0
  },
  "Manacles & Chain": {
    load: 0
  },
  "Rage Essence Vial": {
    load: 0
  },
  "Spiritbane Charm": {
    load: 0
  },
  "Trance Powder": {
    load: 0
  },
  "Vial of Slumber Essence": {
    load: 0
  }
}

const COMMON_ITEMS = [
  "A Blade or Two", "Throwing Knives", "A Blaster", "A 2nd Blaster",
  "A Large Weapon", "An Unusual Weapon", "Armor", "+Heavy", "Burglary Gear",
  "Climbing Gear", "Arcane Implements", "Documents", "Subterfuge Supplies",
  "Demolition Tools", "Tinkering Tools"
];

const PLAYBOOK_ITEMS = {
  "Spider": [
    "Fine Cover Identity", "Fine Bottle of Whisky", "Blueprints",
    "Vial of Slumber Essence", "Concealed Palm Blaster", "Spiritbane Charm"
  ],
  "Cutter": [
    "Fine Hand Weapon", "Fine Heavy Weapon", "Fine Scary Weapon or Tool",
    "Manacles & Chain", "Rage Essence Vial", "Spiritbane Charm"
  ],
  "Slide": [
    "Fine Clothes & Jewelry", "Fine Disguise Kit",
    "Fine Loaded Dice, Trick Cards", "Trance Powder", "A Cane Sword",
    "Spiritbane Charm"
  ]
};

export { ITEMS, COMMON_ITEMS, PLAYBOOK_ITEMS };
