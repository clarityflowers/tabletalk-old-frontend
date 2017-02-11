import React from 'react';
import styled from 'styled-components';

import Colors from 'games/blades-in-the-dark/common/colors';
import Fonts from 'games/blades-in-the-dark/common/fonts';
import { fadeout } from 'utils/color-tools';
import {
  SPECIAL_ABILITIES, PLAYBOOK_ABILITIES
} from 'games/blades-in-the-dark/window/character/data/special-abilities.js';

const { fire, stone, sun } = Colors;

const Strong = styled.strong`
  font-weight: 500;
`
const Em = styled.em`
  color: ${fadeout(sun, 0.5)};
`;

const parse = (array, ending) => {
  let result = [];
  let buffer = "";
  let char = array.pop();
  let i=0;
  while (true) {
    if (char == ending) {
      result.push(buffer);
      return result;
    }
    else if (['*', '_'].includes(char)) {
      if (buffer) {
        result.push(buffer);
        buffer = "";
      }
      const inner = parse(array, char);
      if (char == "*") {
        result.push(
          <Strong key={i++}>{inner}</Strong>
        );
      }
      else if (char == "_") {
        result.push(
          <Em key={i++}>{inner}</Em>
        );
      }
    }
    else {
      buffer += char;
    }
    char = array.pop();
  }
}

const P = styled.p`
  width: 100%;
  max-width: 38em;
  margin: .5em 0;
  &:first-child {
    margin-top: 0;
  }
  font: ${Fonts.body};
  user-select: text;
`
const Name = styled.span`
  font: ${Fonts.h1};
  font-size: 1.25em;
  margin-right: .5em;
  color: ${sun};
  line-height: .8em;
`

const Ability = (props) => {
  const { name } = props;
  const ability = SPECIAL_ABILITIES[name];
  let description = null;
  if (ability && ability.description) {
    description = ability.description.split("").reverse();
  }
  const result = parse(description);
  return (
    <P>
        <Name>{name}:</Name>
        {result}
    </P>
  )
}

const { string } = React.PropTypes;
Ability.propTypes = {
  name: string.isRequired
}

export default Ability;
