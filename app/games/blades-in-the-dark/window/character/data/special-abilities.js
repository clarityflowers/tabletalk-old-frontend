'use strict'

const SPECIAL_ABILITIES = {
  "A Little Something on the Side": {
    description: `At the end of each downtime phase, you earn *+1 stash*.`
  },
  "Battleborn": {
    description: `You get *special armor* against physiical attacks. When you
                  roll a *critical* in combat, *clear 1 stress*.`
  },
  "Brutal": {
    description: `Your attacks are more powerful; you hit as if weilding a
                  heavier weapon. You gain *+1 effect* when you harm physical
                  targets`
  },
  "Calculating": {
    description: `Due to your careful planning, during *downtime*, you may give
                  yourself or another crew member +1 downtime action.`
  },
  "Cloak & Dagger": {
    description: `When you use a disguise or other form of covert misdirection
                  you get *+1 effect*. When you throw off your disguise, the
                  resulting surprise gives you the initiative in the situation.`
  },
  "Connected": {
    description: `During *downtime*, you get *+1 result level* when you make
                  *acquire asset*, *gather info*, or *reduce heat* rolls.`
  },
  "Everyone Steals": {
    description: `Each PC may add +1 action rating to *Prowl*, *Finesse*, or
                  *Tinker* (up to a max rating of 3).`
  },
  "Foresight": {
    description: `Three times per score you can assist another rogue without
                  paying stress. Tell us how you prepared them for the
                  situation.`
  },
  "Functioning Vice": {
    description: `When you indulge your *vice*, you may adjust the outcome by
                  +/− 1. An ally who joins in your vice may do the same.`
  },
  "Ghost Contract": {
    description: `When you shake on a deal, you and your partner—human or
                  otherwise—both bear a mark of your oath. If either breaks the
                  contract, they take level 3 harm (_Cursed_)`
  },
  "Ghost Fighter": {
    description: `You may imbue your hands, melee weapons, or tools with spirit
                  energy. You gain *potency* in combat vs. the supernatural.`
  },
  "Ghost Voice": {
    description: `You know the secret method to interact with a ghost or demon
                  as if it was a normal human, regardless of how wild or feral
                  it appears. You gain *potency* when communicating with the
                  supernatural.`
  },
  "Jail Bird": {
    description: `When *incarcerated*, your wanted level counts as 1 less, your
                  Tier as 1 more, and you gain +1 faction status in addition to
                  your roll.`
  },
  "Leader": {
    description: `When you *Command* a *cohort* in combat, they continue to
                  fight when they would otherwise *break* (they're not taken out
                  when they suffer level 3 harm). They gain *potency* and *1
                  armor*`
  },
  "Like Looking into a Mirror": {
    description: `You can always tell when someone is lying to you.`
  },
  "Mastermind": {
    description: `You get *special armor* when protecting a teammate. _How did
                  you plan for this?_ If a *crit* is rolled when you command a
                  a gang or lead a group action, *clear 1 stress*.`,
    armor: true
  },
  "Mesmerism": {
    description: `When you *sway* someone, you may cause them to forget that
                  it's happened until they next interact with you.`
  },
  "Not to be Trifled With": {
    description: `In close combat, you are equal in *scale* to a small gang.`
  },
  "Pack Rats": {
    description: `Your lair is a jumble of stolen items. When you roll to
                  *acquire an asset*, take *+1d*.`
  },
  "Resilient": {
    description: `When you have *downtime*, mark *+3 segments* on your healing
                  clock. When you *push yourself* to ignore a harm penalty, you
                  take only 1 stress instead of 2.`
  },
  "Rook's Gambit": {
    description: `Take *2 stress* to roll your best action rating while
                  performing a different action. Say how you adapt your skill to
                  this use.`
  },
  "Savage": {
    description: `When you unleash physical violence, it's especially
                  frightening. When you *Command* a frightened target, take
                  *+1d*.`
  },
  "Subterfuge": {
    description: `You get *special armor* vs. persuasion and suspicion. When you
                  roll a *critical* while using subterfuge, *clear 1 stress*.`
  },
  "Tough as Nails": {
    description: `When you roll *Prowess*, you get *+1d*.`
  },
  "Trust in Me": {
    description: `You get *+1d* vs. a target you have a relationship with.`
  },
  "Weaving the Web": {
    description: `You gain *+1d* to the *engagement roll* if yu've gather info
                  on the target or location.`
  },
}

const PLAYBOOK_ABILITIES = {
  "Cutter": [
    "Brutal", "Resilient", "Tough as Nails", "Savage", "Ghost Fighter",
    "Not to be Trifled With", "Battleborn", "Leader"
  ],
  "Slide": [
    "Rook's Gambit", "Mesmerism", "Cloak & Dagger",
    "A Little Something on the Side", "Like Looking into a Mirror",
    "Trust in Me", "Subterfuge", "Ghost Voice"
  ],
  "Spider": [
    "Weaving the Web", "Foresight", "Functioning Vice", "Calculating",
    "Ghost Contract", "Connected", "Mastermind", "Jail Bird"
  ],
}

const CREW_ABILITIES = {
  "Shadows": [
    "Everyone Steals", "Pack Rats", "Slippery", "Synchronized", "Second Story",
    "Patron", "Ghost Echoes"
  ]
}


export {SPECIAL_ABILITIES, PLAYBOOK_ABILITIES};
