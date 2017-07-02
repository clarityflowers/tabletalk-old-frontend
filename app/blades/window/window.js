'use strict'

import React from 'react';
import rx from 'resplendence';

import TabButton from './tab-button';
import DiceRoller from './dice-roller';
import Portal from './common/portal';
import Character from './character/character';
import Crew from './crew/crew';
import OptionsMenu from 'options/options-menu';
import Dispatcher from 'utils/dispatcher';

import { TAB_TYPES } from 'blades/common/enums';

rx`
@import "~blades/common/colors";
`

const Container = rx('div')`
  position: relative;
  font-size: 20px;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  @media only screen and (max-width: 800px) {
    margin-bottom: 20px;
  }
`
const TabButtons = rx('div')`
  position: absolute;
  bottom: 0;
  height: 2em;
  width: 100%;
  display: flex;
  font-size: .75em;
  flex-direction: row;
  align-items: center;
  background-color: $stone;
  box-shadow: 0 0 1em 1em $stone;
  z-index: 100;
`

const Tab = rx('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: left .15s;
  overflow: hidden;
  left: 0;
  &.left {
    left: -100%;
  }
  &.right {
    left: 100%;
  }
`

const Tabs = rx('div')`
  width: 100%;
  height: 100%;
`

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
    this.sendCharacter = this.sendCharacter.bind(this);
    this.sendCrew = this.sendCrew.bind(this);
  }
  shouldComponentUpdate(newProps) {
    const tabsEqual = (a, b) => {
      if (a.length !== b.length) { return false; }
      for (let i=0; i < a.length; i++) {
        if (
          a[i].type !== b[i].type ||
          a[i].character !== b[i].character ||
          a[i].crew !== b[i].crew
        ) {
          return false;
        }
      }
      return true;
    }
    if (
      newProps.game !== this.props.game ||
      !tabsEqual(newProps.tabs, this.props.tabs) ||
      newProps.library !== this.props.library ||
      !newProps.route.equals(this.props.route) ||
      newProps.options !== this.props.options ||
      newProps.auth !== this.props.auth
    ) {
      return true;
    }
    return false;
  }
  send(what, id) {
    const { send } = this.props;
    return (action, value) => {
      const data = {action};
      if (value) {
        data.value = value;
      }
      if (id) {
        data.id = id;
      }
      send({what, data});
    }
  }
  sendCharacter(id) {
    return this.send("character", id)
  }
  sendCrew(id) {
    return this.send("crew", id)
  }
  render() {
    const {
      send,
      me,
      game, tabs,
      library,
      route, options, auth, onChat
    } = this.props;
    let activeRoute = this.props.route;
    let portals = [];
    const tabDoms = [];
    let tabButtons = [];
    let baseUrl = `/games/${game.id}/go`;
    let activeTab = null;
    if (!route.isExact) {
      activeRoute = route.next();
      activeTab = parseInt(activeRoute.name);
    }
    for (let i=0; i < tabs.length; i++) {
      let data = tabs[i];
      let dom = null;
      if (data.type == TAB_TYPES.CHARACTER) {
        let character = data.character;
        tabButtons.push(
          <TabButton route={route.push(i)}
               name={character.name}
               active={i == activeTab}
               key={`${data.type}_${character.id}`}
               index={i}/>
        );
        dom = (
          <Dispatcher dispatch={this.sendCharacter(character.id)}>
            <Character character={character} crew={data.crew}
                       active={i == activeTab} me={me} route={route.push(i)}
                       library={library.character}/>
          </Dispatcher>
        );
      }
      else if (data.type == TAB_TYPES.CREW) {
        let crew = data.crew;
        tabButtons.push(
          <TabButton route={route.push(i)}
               active={i == activeTab}
               name={crew.name}
               key={`${data.type}_${crew.id}`}
               index={i}/>
        )
        dom = (
          <Dispatcher dispatch={this.sendCrew(crew.id)}>
            <Crew crew={crew} active={i == activeTab} me={me}
                  route={route.push(i)} library={library.crew}/>
          </Dispatcher>
        );
      }
      tabDoms.push(
        <Tab key={i} rx={{left: i < activeTab, right: i > activeTab}}>
          {dom}
        </Tab>
      )
    }

    return (
      <Container>
        <OptionsMenu route={route} on={options} auth={auth}/>
        <DiceRoller onChat={onChat}/>
        {tabDoms}
        <TabButtons>
          {tabButtons}
        </TabButtons>
      </Container>
    );
  }
}

const { object, func, number, array, bool } = React.PropTypes;
Window.propTypes = {
  send: func.isRequired,
  me: object,
  game: object.isRequired,
  tabs: array.isRequired,
  library: object.isRequired,
  route: object.isRequired,
  options: bool.isRequired,
  auth: object.isRequired,
  onChat: func.isRequired
}
export default Window;
