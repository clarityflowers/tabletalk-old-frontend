'use strict'

import React from 'react';
import styled from 'styled-components';

import Title from 'blades/common/components/title';
import Rep from './rep';
import Tier from './tier';
import Claims from './claims/claims';
import Heat from './heat';
import Vaults from './vaults';
import Abilities from './abilities';
import Cohorts from './cohorts/cohorts';
import Upgrades from './upgrades/upgrades';

import Sheet from 'blades/window/styles/sheet';
import Row from 'common/row';
import SheetRow from 'blades/window/styles/sheet-row';
import Side from 'blades/window/styles/side';

const StatusRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
`

class Crew extends React.PureComponent {
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
      me
    } = this.props;
    const disabled = !edit.includes(me.id);
    let turf = 0;
    let vaults = 0;
    let cohortDOM = null;

    for (let r=0; r < claims.claims.length; r++) {
      const row = claims.claims[r];
      for (let c=0; c < row.length; c++) {
        const claim = row[c];
        if (claim.owned && claim.name == 'Turf') {
          turf++;
        }
      }
    }

    if (cohorts.length > 0) {
      cohortDOM = (
        <Column>
          <Cohorts cohorts={[]} disabled={disabled}/>
        </Column>
      )
    }

    return (
      <Sheet>
        <Title name={name} playbook={playbook} crew/>
        <SheetRow>
          <Column>
            <StatusRow>
              <Rep rep={rep} turf={turf} disabled={disabled}/>
              <Tier tier={tier} strong={strong}/>
            </StatusRow>
            <Claims {...claims} disabled={disabled}/>
            <StatusRow>
              <Heat heat={heat} wantedLevel={wantedLevel} disabled={disabled}/>
              <Vaults coin={coin} vaults={lairUpgrades[5].value} disabled={disabled}/>
            </StatusRow>
          </Column>
          <Column>
            <Abilities xp={xp} abilities={abilities} disabled={disabled}/>
          </Column>
          {cohortDOM}
        </SheetRow>
        <SheetRow>
          <Upgrades upgrades={crewUpgrades} name="Upgrades"
                    available={availableUpgrades} disabled={disabled}/>
          <Upgrades upgrades={lairUpgrades} name="Lair"
                    available={availableUpgrades} disabled={disabled}/>
          <Upgrades upgrades={qualityUpgrades} name="Quality"
                    available={availableUpgrades} disabled={disabled}/>
          <Upgrades upgrades={trainingUpgrades} name="Training"
                    available={availableUpgrades} disabled={disabled}/>
        </SheetRow>
      </Sheet>
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
  contacts: array.isRequired,
  lairUpgrades: array.isRequired,
  qualityUpgrades: array.isRequired,
  trainingUpgrades: array.isRequired,
  crewUpgrades: array.isRequired,
  me: object.isRequired
}

export default Crew;
