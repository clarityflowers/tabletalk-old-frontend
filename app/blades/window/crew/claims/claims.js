'use strict'

import React from 'react';
import styled from 'styled-components';

import Claim from './claim';

import Colors from 'blades/common/colors';
import { darken, lighten, fadeout, mix, desaturate } from 'utils/color-tools';
import cz from 'utils/styled-classes';

const { sun, stone, fire, shadow } = Colors;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 .5em .5em .5em;
`
const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const Dividers = styled(cz('div', ['show', 'highlight', 'owned']))`
  background: none;
  &.show {
    box-shadow: ${shadow};
    background: ${darken(stone, 0.1)};
    &.highlight {
      background: ${fadeout(sun, 0.9)};
      // background: ${mix(fire, stone, 0.5)};
    }
    &.owned {
      background: ${mix(desaturate(sun, 0.5), stone, 0.6)};
    }
  }
`
const Horizontal = styled(Dividers)`
  width: 1em;
  height: 1em;
  flex: 1 1 auto;
`
const Vertical = styled(Dividers)`
  width: 1em;
  height: 1em;
  margin: 0 2.7em;
`
const VerticalRow = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`

class Claims extends React.PureComponent {
  render() {
    const { claims, vertical, horizontal, disabled } = this.props;
    let rows = [];
    for (let r=0; r < 3; r++) {
      let row = [];
      for (let c=0; c < 5; c++) {
        let claim = claims[r][c];
        let available = false;
        if (c > 0  && horizontal[r][c-1] && claims[r][c-1].owned) {
          available = true;
        }
        if (c < 4 && horizontal[r][c] && claims[r][c+1].owned) {
          available = true;
        }
        if (r > 0 && vertical[r-1][c] && claims[r-1][c].owned) {
          available = true;
        }
        if (r < 2 && vertical[r][c] && claims[r+1][c].owned) {
          available = true;
        }
        row.push(
          <Claim key={c} r={r} c={c} name={claim.name}
                 description={claim.description}
                 available={available} owned={claim.owned}
                 disabled={disabled}/>
        );
        if (c < 4) {
          let show = horizontal[r][c];
          let highlight = false;
          let owned = false;
          const left = claim.owned;
          const right =  c < 4 && claims[r][c+1].owned;
          if (show) {
            owned = left && right;
            if (!owned) {
              highlight = left || right;
            }
          }
          row.push(
            <Horizontal key={'d' + c} show={show}
                        highlight={highlight} owned={owned}/>
          );
        }
      }
      rows.push(
        <Row key={r}>
          {row}
        </Row>
      );
      if (r < 2) {
        let vRow = [];
        for (let c=0; c < 5; c++) {
          let show = vertical[r][c];
          let highlight = false;
          let owned = false;
          const top = claims[r][c].owned;
          const bottom = r < 2 && claims[r+1][c].owned
          if (show) {
            owned = top && bottom;
            if (!owned) {
              highlight = top || bottom;
            }
          }
          vRow.push(
            <Vertical key={c} show={show} highlight={highlight} owned={owned}/>
          );
        }
        rows.push(
          <VerticalRow key={'d' + r}>{vRow}</VerticalRow>
        );
      }
    }
    return (
      <Container>
        {rows}
      </Container>
    );
  }
}

const { array, bool } = React.PropTypes;
Claims.propTypes = {
  claims: array.isRequired,
  vertical: array.isRequired,
  horizontal: array.isRequired,
  disabled: bool.isRequired
}

export default Claims;
