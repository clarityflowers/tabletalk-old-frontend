'use strict'

const SPECIAL_ABILITIES = {
  "A Little Something on the Side": {
    description: `At the end of each downtime phase, you earn *+2 stash*.`
  },
  "Battleborn": {
    description: `You may expend your *special armor* to reduce harm from an
                  attack in combat or to *push yourself* during a fight.`
  },
  "Bodyguard": {
    description: `When you *protect* a teammate, take *+1d* to your resistance
                  roll. When you *gather info* to anticipate possible threats in
                  the current situation, you get *+1 effect*.`
  },
  "Calculating": {
    description: `Due to your careful planning, during *downtime*, you may give
                  yourself or another crew member +1 downtime action.`
  },
  "Cloak & Dagger": {
    description: `When you use a disguise or other form of covert misdirection
                  you get *+1d* to rolls to confuse or deflect suspicion. When
                  you throw off your disguise, the resulting surprise gives you
                  the initiative in the situation.`
  },
  "Connected": {
    description: `During *downtime*, you get *+1 result level* when you make
                  *acquire asset*, *gather info*, or *reduce heat* rolls.`
  },
  "Foresight": {
    description: `Two times per score you can *assist* a teammate without
                  paying stress. Tell us how you prepared for this.`
  },
  "Functioning Vice": {
    description: `When you indulge your *vice*, you may adjust the outcome by
                  1 or 2 (up or down). An ally who joins in your vice may do the
                  same.`
  },
  "Ghost Contract": {
    description: `When you shake on a deal, you and your partner—human or
                  otherwise—both bear a mark of your oath. If either breaks the
                  contract, they take level 3 harm, "Cursed".`
  },
  "Ghost Fighter": {
    description: `You may imbue your hands, melee weapons, or tools with spirit
                  energy. You gain *potency* in combat vs. the supernatural. You
                  may grapple with spirits to restrain and capture them.`
  },
  "Ghost Voice": {
    description: `You know the secret method to interact with a ghost or demon
                  as if it was a normal human, regardless of how wild or feral
                  it appears. You gain *potency* when communicating with the
                  supernatural.`
  },
  "Jail Bird": {
    description: `When *incarcerated*, your wanted level counts as 1 less, your
                  Tier as 1 more, and you gain +1 faction status with a faction
                  you help on the inside (in addition to your incarceration
                  roll).`
  },
  "Leader": {
    description: `When you *Command* a *cohort* in combat, they continue to
                  fight when they would otherwise *break* (they're not taken out
                  when they suffer level 3 harm). They gain *potency* and *1
                  armor*.`
  },
  "Like Looking into a Mirror": {
    description: `You can always tell when someone is lying to you.`
  },
  "Mastermind": {
    description: `You may expend your *special armor* to protect a teammate, or
                  to *push yourself* when you gather information or work on a
                  long-term project.`
  },
  "Mesmerism": {
    description: `When you *sway* someone, you may cause them to forget that
                  it's happened until they next interact with you.`
  },
  "Mule": {
    description: `Your load limits are higher. Light: 5. Normal: 7. Heavy: 8.`,
    load: 2
  },
  "Not to be Trifled With": {
    description: `You can *push yourself* to do one of the following: _perform a
                  feat of physical force that verges on the superhuman_—_engage a
                  small gang on equal footing in close combat_.`
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
    description: `You may expend your *special armor* to resist a consequence
                  from suspsicion or persuasion, or to *push yourself* for
                  subterfuge.`
  },
  "Trust in Me": {
    description: `You get *+1d* vs. a target with whom you have an intimate
                  relationship.`
  },
  "Vigorous": {
    description: `You recover from harm faster. Permanently fill in one of your
                  healing clock segments. Take *+1d* to healing treatment rolls`,
    vigor: true
  },
  "Weaving the Web": {
    description: `You gain *+1d* to *Consort* when you *gather information* on a
                  target for a score. You get *+1d* to the *engagement roll* for
                  that operation.`
  },
}

const PLAYBOOK_ABILITIES = {
  "Cutter": [
    "Battleborn", "Bodyguard", "Ghost Fighter", "Leader", "Mule",
    "Not to be Trifled With", "Savage", "Vigorous"
  ],
  "Slide": [
    "Rook's Gambit", "Cloak & Dagger", "Ghost Voice",
    "A Little Something on the Side", "Like Looking into a Mirror",
    "Mesmerism", "Subterfuge", "Trust in Me",
  ],
  "Spider": [
    "Foresight", "Calculating", "Connected", "Functioning Vice",
    "Ghost Contract", "Jail Bird", "Mastermind", "Weaving the Web",
  ],
}


export {SPECIAL_ABILITIES, PLAYBOOK_ABILITIES};
