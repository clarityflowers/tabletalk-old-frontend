
'use strict'

import React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Title from './title';
import Stats from './stats/stats';
import Stress from './stress/stress-and-trauma';
import Harm from './harm/harm'

import CommonRow from 'common/row';
import CommonColumn from 'common/column';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 3em;
  padding: 0.5em;
`
const Row = styled(CommonRow)`
  justify-content: center;
  align-items: flex-start;
  flex: 1 1 auto;
`
const Column = styled(CommonColumn)`
  align-items: stretch;
  margin: 0 0.5em;
`

class Character extends React.PureComponent {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  getChildContext() {
    return { dispatch: this.update };
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
    const action = (data) => {
      data.id = id;
      send(data);
    }
    const incrementXP = (stat) => {
      return () => {
        action({action: "increment_xp", value: stat});
      }
    }
    const decrementXP = (stat) => {
      return () => {
        action({action: "decrement_xp", value: stat});
      }
    }
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
    const health = {
      specialAbilities, strangeFriends, playbook,
      harm: {
        edit: ({harm, text}) => { action({action: "edit_harm", value: {harm, text}}); }
      },
      healing: {
        unlocked: healingUnlocked,
        clock: healingClock,
        unlock: (value) => { action({action: "unlock_healing", value: value}); },
        increment: () => { action({action: "increment_healing"}); },
        decrement: () => { action({action: "decrement_healing"}); }
      },
      armor: {
        armor: {
          used: armor,
          available: items.includes("Armor")
        },
        heavy: {
          used: heavyArmor,
          available: armor && items.includes("+Heavy")
        },
        special: specialArmor,
        use: ({name, used}) => { action({action: "use_armor", value: {name, used}}); }
      },
      details: {
        look, heritage, background, vice,
      }
    }
    // const equipment = {
    //   load, items, playbook,
    //   use: (name) => { action({action: "use_item", value: name}); },
    //   clear: (name) => { action({action: "clear_item", value: name}); },
    //   clearAll: () => { action({action: "clear_items"}); },
    //   setLoad: (value) => { action({action: "set_load", value: value}); }
    // }
    return (
      <Container>
        <Title {...names}/>
        <Row>
          <Column>
            <Stats {...stats} disabled={disabled}/>
          </Column>
          <Column>
            <Stress stress={stress} trauma={trauma} disabled={disabled}/>
            <Harm {...harm} disabled={disabled}/>
          </Column>
        </Row>
      </Container>
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
  specialArmor: React.PropTypes.array.isRequired,
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

Character.childContextTypes = {
  dispatch: React.PropTypes.func
}

export default Character;
