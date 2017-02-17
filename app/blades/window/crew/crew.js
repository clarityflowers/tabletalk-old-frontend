'use strict'

import React from 'react';
import styled from 'styled-components';

import RepStatus from './rep/rep-status';
import Title from 'blades/common/components/title';

import Sheet from 'blades/window/styles/sheet';
import Row from 'common/row';
import SheetRow from 'blades/window/styles/sheet-row';
import Side from 'blades/window/styles/side';

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
      upgrades, availableUpgrades,
      claims,
      abilities, contacts,
      edit, view,
      me
    } = this.props;
    const disabled = !edit.includes(me.id);
    let turf = 0;
    for (let i=0; i < claims.length; i++) {
      const claim = claims[i];
      if (claim.owned && claim.name == 'Turf') {
        turf++;
      }
    }
    const repStatus = {rep, turf};
    const tierStatus = {tier, strong};
    const heatStatus = {heat, wantedLevel};
    let vault1 = false; // TODO
    let vault2 = false; // TODO
    const money = {coin, vault1, vault2}
    const grounds = {
      type: huntingGrounds,
      description: huntingGroundsDescription
    };

    return (
      <Sheet>
        <Title name={name} playbook={playbook} crew/>
        <SheetRow>
          <RepStatus {...repStatus} disabled={disabled}/>
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
  claims: array.isRequired,
  abilities: array.isRequired,
  contacts: array.isRequired,
  upgrades: array.isRequired,
  me: object.isRequired
}

export default Crew;
