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
import Friends from 'blades/window/common/friends';

import Container from 'blades/window/styles/sheet';
import Portal from 'blades/window/common/portal';
import Row from 'common/row';
import SheetRow from 'blades/window/styles/sheet-row';
import Side from 'blades/window/styles/side';
import Detail from 'blades/window/common/detail';

const StatusRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  flex: 0 1 auto;
`
const AbilityColumn = styled(Column)`
  flex: 1 1 auto;
  max-width: 30em;
`
const CrewRow = styled(SheetRow)`
`

class Sheet extends React.PureComponent {
  render() {
    const {
      name, playbook, reputation, rep, turf, strong, tier, heat, wantedLevel,
      coin, vaults, xp, huntingGrounds, huntingGroundsDescription, lair,
      availableUpgrades, claims, cohorts, abilities, contacts, lairUpgrades,
      qualityUpgrades, trainingUpgrades, crewUpgrades, route, disabled, off
    } = this.props;

    let cohortDOM = null;
    if (cohorts.length > 0) {
      cohortDOM = (
        <Column>
          <Cohorts cohorts={[]} disabled={disabled}/>
        </Column>
      )
    }

    let huntingGroundsDOM = null;
    if (huntingGrounds) {
      huntingGroundsDOM = (
        <Detail name={"Hunting Grounds: " + huntingGrounds} alwaysShow>
          {huntingGroundsDescription}
        </Detail>
      )
    }

    return (
      <Portal left={off}>
        <Container>
          <Title name={name} playbook={playbook} crew/>
          <CrewRow>
            <Column>
              <StatusRow>
                <Rep rep={rep} turf={turf} disabled={disabled}/>
                <Tier tier={tier} strong={strong}/>
              </StatusRow>
              <Claims {...claims} disabled={disabled}/>
              <StatusRow>
                <Heat heat={heat} wantedLevel={wantedLevel} disabled={disabled}/>
                <Vaults coin={coin} vaults={lairUpgrades["Vault"].value} disabled={disabled}/>
              </StatusRow>
            </Column>
            <AbilityColumn>
              <Abilities xp={xp} abilities={abilities} disabled={disabled} route={route} available={availableUpgrades}/>
            </AbilityColumn>
            {cohortDOM}
          </CrewRow>
          <CrewRow>
            <Upgrades upgrades={crewUpgrades} name="Upgrades" showAvailable
                      available={availableUpgrades} disabled={disabled}/>
            <Upgrades upgrades={lairUpgrades} name="Lair"
                      available={availableUpgrades} disabled={disabled}/>
            <Upgrades upgrades={qualityUpgrades} name="Quality"
                      available={availableUpgrades} disabled={disabled}/>
            <Upgrades upgrades={trainingUpgrades} name="Training"
                      available={availableUpgrades} disabled={disabled}/>
            <Column>
              <Detail name="Reputation">{reputation}</Detail>
              {huntingGroundsDOM}
              <Detail name="Lair">{lair}</Detail>
            </Column>
          </CrewRow>
          <CrewRow>
            <Column>
              <Detail name="Contacts">
                <Friends strangeFriends={contacts}/>
              </Detail>
            </Column>
          </CrewRow>
        </Container>
      </Portal>
    )
  }
}

const { string, number, bool, array, object } = React.PropTypes;
Sheet.propTypes = {
  name: string.isRequired,
  playbook: string,
  reputation: string,
  rep: number.isRequired,
  turf: number.isRequired,
  strong: bool.isRequired,
  tier: number.isRequired,
  heat: number.isRequired,
  wantedLevel: number.isRequired,
  coin: number.isRequired,
  vaults: number.isRequired,
  xp: number.isRequired,
  huntingGrounds: string,
  huntingGroundsDescription: string,
  lair: string,
  availableUpgrades: number.isRequired,
  claims: object.isRequired,
  cohorts: array.isRequired,
  abilities: array.isRequired,
  contacts: array.isRequired,
  lairUpgrades: object.isRequired,
  qualityUpgrades: object.isRequired,
  trainingUpgrades: object.isRequired,
  crewUpgrades: object.isRequired,
  route: object.isRequired,
  off: bool.isRequired,
}

export default Sheet;
