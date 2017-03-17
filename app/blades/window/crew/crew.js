'use strict'

import React from 'react';
import styled from 'styled-components';

import Sheet from './sheet/sheet';
import NewAbility from 'blades/window/common/pages/new-ability/new-ability';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

class Crew extends React.PureComponent {
  componentWillMount() {
    this.checkRoute(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.checkRoute(nextProps);
  }
  checkRoute(props) {
    const { route, availableUpgrades } = props;
    if (!route.isExact) {
      if (route.nextName == 'new_ability') {
        if (availableUpgrades < 2) {
          route.replace();
        }
      }
    }
  }
  render() {
    const {
      id,
      name, playbook, reputation,
      rep, strong, tier,
      heat, wantedLevel,
      coin, xp,
      huntingGrounds, huntingGroundsDescription,
      lair,
      lairUpgrades, qualityUpgrades, trainingUpgrades, crewUpgrades,
      availableUpgrades,
      claims, cohorts,
      abilities, contacts,
      edit, view,
      me,
      route, library
    } = this.props;
    const disabled = !edit.includes(me.id);
    let turf = 0;
    let vaults = 0;
    let next = route;

    for (let r=0; r < claims.claims.length; r++) {
      const row = claims.claims[r];
      for (let c=0; c < row.length; c++) {
        const claim = row[c];
        if (claim.owned && claim.name == 'Turf') {
          turf++;
        }
      }
    }

    let portal = 'sheet';
    if (!route.isExact) {
      if (
        route.nextName == 'new_ability' &&
        !disabled &&
        availableUpgrades >= 2
      ) {
        portal = 'new_ability';
      }
    }
    const nextRoute = route.push(portal);

    const sheetProps = {
      name, playbook, reputation, rep, turf, strong, tier, heat, wantedLevel,
      coin, vaults, xp, huntingGrounds, huntingGroundsDescription, lair,
      availableUpgrades, claims, cohorts, abilities, contacts,
      lairUpgrades, qualityUpgrades, trainingUpgrades, crewUpgrades,
      route, disabled, library,
      off: portal != 'sheet'
    }
    const abilityProps = {
      abilities, playbook,
      library: library.abilities,
      off: portal != 'new_ability',
      route: nextRoute,
      maxVeteran: 2
    }

    return (
      <Container>
        <Sheet {...sheetProps}/>
        <NewAbility {...abilityProps}/>
      </Container>
    );
  }
};

const { string, number, bool, array, object } = React.PropTypes;
Crew.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  playbook: string,
  reputation: string,
  rep: number.isRequired,
  strong: bool.isRequired,
  tier: number.isRequired,
  heat: number.isRequired,
  wantedLevel: number.isRequired,
  coin: number.isRequired,
  xp: number.isRequired,
  huntingGrounds: string,
  huntingGroundsDescription: string,
  lair: string,
  availableUpgrades: number.isRequired,
  edit: array.isRequired,
  view: array.isRequired,
  claims: object.isRequired,
  cohorts: array.isRequired,
  abilities: array.isRequired,
  library: object.isRequired,
  contacts: array.isRequired,
  lairUpgrades: object.isRequired,
  qualityUpgrades: object.isRequired,
  trainingUpgrades: object.isRequired,
  crewUpgrades: object.isRequired,
  me: object.isRequired,
  route: object.isRequired
}

export default Crew;
