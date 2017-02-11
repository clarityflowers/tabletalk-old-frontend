
'use strict'

import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Title from './title';
import Stats from './stats/stats';
import Stress from './stress/stress-and-trauma';
import Harm from './harm/harm'
import ArmorHealing from './armor-healing/armor-healing';
import Equipment from './equipment/equipment';
import Abilities from './abilities/abilities';
import Detail from './details/detail';
import StrangeFriends from './friends/strange-friends';

import Dispatcher from 'utils/dispatcher';

import CommonRow from 'common/row';
import CommonColumn from 'common/column';

const margin = 1;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 3em;
`
const Row = styled(CommonRow)`
  justify-content: center;
  align-items: flex-start;
  flex: 1 1 auto;
`
const Column = CommonColumn;
const Side = styled(Column)`
  margin: 0 ${margin}em;
  flex: 0 100 auto;
  align-items: stretch;
`
const StressHarm = styled(Column)`
  flex: 1 1 auto;
  align-items: stretch;
  justify-content: space-between;
  width: 24em;
  min-width: 15em;
  max-width: 40em;
`
const MiddleRow = styled(CommonRow)`
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`
const MiddleColumn = styled(Column)`
  flex: 2 1 0;
`
const Health = styled(Row)`
  margin: ${margin}em;
  align-items: stretch;
  display: flex;
  flex-flow: row wrap;
  flex: 3 1 auto;
`

class Character extends React.PureComponent {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update (action, value) {
    const data = {
      id: this.props.id,
      action: action
    };
    console.log('UPDATE', action, value);
    if (value != undefined) {
      data.value = value;
    }
    this.props.send(data);
  }
  render() {
    const {
      id,
      name, playbook, alias,
      look, heritage, background, vice,
      playbookXP,
      coin, stash,
      insightXP, hunt, study, survey, tinker,
      prowessXP, finesse, prowl, skirmish, wreck,
      resolveXP, attune, command, consort, sway,
      stress, trauma,
      healingUnlocked, healingClock,
      harmSevere, harmModerate1, harmModerate2, harmLesser1, harmLesser2,
      armor, heavyArmor, specialArmor,
      load, items,
      editPermission, viewPermission,
      specialAbilities, strangeFriends,
      onChat, me, send
    } = this.props;
    const disabled = !editPermission.includes(me.id);
    const names = {name, playbook, alias};
    const stats = {
      coin, stash, playbookXP,
      hunt, study, survey, tinker, insightXP,
      finesse, prowl, skirmish, wreck, prowessXP,
      attune, command, consort, sway, resolveXP
    };
    const harm = {
      severe: harmSevere,
      moderate1: harmModerate1,
      moderate2: harmModerate2,
      lesser1: harmLesser1,
      lesser2: harmLesser2,
    };
    const armorHealing = {
      armorUsed: armor,
      armorAvailable: items.includes("Armor"),
      heavyUsed: heavyArmor,
      heavyAvailable: armor && items.includes("+Heavy"),
      specialUsed: specialArmor,
      healingClock, healingUnlocked
    };
    const equipment = {load, items, playbook};
    const abilities = {specialAbilities, playbook};
    // const health = {
    //   specialAbilities, strangeFriends, playbook,
    //   harm: {
    //     edit: ({harm, text}) => { action({action: "edit_harm", value: {harm, text}}); }
    //   },
    //   healing: {
    //     unlocked: healingUnlocked,
    //     clock: healingClock,
    //     unlock: (value) => { action({action: "unlock_healing", value: value}); },
    //     increment: () => { action({action: "increment_healing"}); },
    //     decrement: () => { action({action: "decrement_healing"}); }
    //   },
    //   armor: {
    //     armor: {
    //       used: armor,
    //       available: items.includes("Armor")
    //     },
    //     heavy: {
    //       used: heavyArmor,
    //       available: armor && items.includes("+Heavy")
    //     },
    //     special: specialArmor,
    //     use: ({name, used}) => { action({action: "use_armor", value: {name, used}}); }
    //   },
    //   details: {
    //     look, heritage, background, vice,
    //   }
    // }
    // const equipment = {
    //   load, items, playbook,
    //   use: (name) => { action({action: "use_item", value: name}); },
    //   clear: (name) => { action({action: "clear_item", value: name}); },
    //   clearAll: () => { action({action: "clear_items"}); },
    //   setLoad: (value) => { action({action: "set_load", value: value}); }
    // }
    return (
      <Dispatcher dispatch={this.update}>
        <Container>
          <Title {...names}/>
          <Row>
            <Side>
              <Stats {...stats} disabled={disabled}/>
            </Side>
            <Column>
              <MiddleRow>
                <Health>
                  <StressHarm>
                    <Stress stress={stress} trauma={trauma} disabled={disabled}/>
                    <Harm {...harm} disabled={disabled}/>
                  </StressHarm>
                  <ArmorHealing {...armorHealing} disabled={disabled}/>
                </Health>
                <MiddleColumn>
                  <Detail name="Special Abilities">
                    <Abilities {...abilities}/>
                  </Detail>
                </MiddleColumn>
              </MiddleRow>
              <MiddleRow>
                <MiddleColumn>
                  <Detail name="Strange Friends">
                    <StrangeFriends strangeFriends={strangeFriends}/>
                  </Detail>
                </MiddleColumn>
                <MiddleColumn>
                  <Detail name="Look">{look}</Detail>
                  <Detail name="Heritage">{heritage}</Detail>
                  <Detail name="Background">{background}</Detail>
                  <Detail name="Vice">{vice}</Detail>
                </MiddleColumn>
              </MiddleRow>
            </Column>
            <Side>
              <Equipment {...equipment} disabled={disabled}/>
            </Side>
          </Row>
        </Container>
      </Dispatcher>
    )
  }
};

Character.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  playbook: React.PropTypes.string,
  alias: React.PropTypes.string,
  look: React.PropTypes.string,
  heritage: React.PropTypes.string,
  background: React.PropTypes.string,
  vice: React.PropTypes.string,
  playbookXP: React.PropTypes.number.isRequired,
  coin: React.PropTypes.number.isRequired,
  stash: React.PropTypes.number.isRequired,
  insightXP: React.PropTypes.number.isRequired,
  hunt: React.PropTypes.number.isRequired,
  study: React.PropTypes.number.isRequired,
  survey: React.PropTypes.number.isRequired,
  tinker: React.PropTypes.number.isRequired,
  prowessXP: React.PropTypes.number.isRequired,
  finesse: React.PropTypes.number.isRequired,
  prowl: React.PropTypes.number.isRequired,
  skirmish: React.PropTypes.number.isRequired,
  wreck: React.PropTypes.number.isRequired,
  resolveXP: React.PropTypes.number.isRequired,
  attune: React.PropTypes.number.isRequired,
  command: React.PropTypes.number.isRequired,
  consort: React.PropTypes.number.isRequired,
  sway: React.PropTypes.number.isRequired,
  stress: React.PropTypes.number.isRequired,
  trauma: React.PropTypes.array.isRequired,
  healingUnlocked: React.PropTypes.bool.isRequired,
  healingClock: React.PropTypes.number.isRequired,
  harmSevere: React.PropTypes.string.isRequired,
  harmModerate1: React.PropTypes.string.isRequired,
  harmModerate2: React.PropTypes.string.isRequired,
  harmLesser1: React.PropTypes.string.isRequired,
  harmLesser2: React.PropTypes.string.isRequired,
  armor: React.PropTypes.bool.isRequired,
  heavyArmor: React.PropTypes.bool.isRequired,
  specialArmor: React.PropTypes.bool.isRequired,
  load: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  editPermission: React.PropTypes.array.isRequired,
  viewPermission: React.PropTypes.array.isRequired,
  specialAbilities: React.PropTypes.array.isRequired,
  strangeFriends: React.PropTypes.array.isRequired,
  onChat: React.PropTypes.func.isRequired,
  me: React.PropTypes.object.isRequired,
  send: React.PropTypes.func.isRequired
}

export default Character;
