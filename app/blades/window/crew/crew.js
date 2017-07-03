'use strict'

import React from 'react';
import rx from 'resplendence';

import Sheet from './sheet/sheet';
import NewAbility from 'blades/window/common/pages/new-ability/new-ability';

const Container = rx('div')`
  width: 100%;
  height: 100%;
`

class Crew extends React.Component {
  componentWillMount() {
    this.checkRoute(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.checkRoute(nextProps);
  }
  shouldComponentUpdate(newProps) {
    if (
      newProps.crew != this.props.crew ||
      newProps.active !== this.props.active || (
        newProps.active &&
        !newProps.route.equals(this.props.route)
      ) ||
      newProps.library !== this.props.library
    ) {
      return true;
    }
    return false;
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
      crew,
      me,
      route, library
    } = this.props;
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
      edit, view
    } = crew;
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
      route: nextRoute
    }

    return (
      <Container>
        <Sheet {...sheetProps}/>
        <NewAbility {...abilityProps} crew/>
      </Container>
    );
  }
};

const { string, number, bool, array, object } = React.PropTypes;
Crew.propTypes = {
  crew: object.isRequired,
  library: object.isRequired,
  me: object.isRequired,
  route: object.isRequired
}

export default Crew;
