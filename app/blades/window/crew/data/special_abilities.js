'use strict'

const SPECIAL_ABILITIES = {
  "Everyone Steals": {
    description: `Each PC may add +1 action rating to *Prowl*, *Finesse*, or
                  *Tinker* (up to a max rating of 3).`
  },
  "Pack Rats": {
    description: `Your lair is a jumble of stolen items. When you roll to
                  *acquire an asset*, take *+1d*.`
  },
}

const CREW_ABILITIES = {
  "Shadows": [
    "Everyone Steals", "Pack Rats", "Slippery", "Synchronized", "Second Story",
    "Patron", "Ghost Echoes"
  ]
}

export {SPECIAL_ABILITIES, PLAYBOOK_ABILITIES};
