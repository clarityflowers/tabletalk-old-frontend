import React from 'react';
import styled from 'styled-components';

import Colors from 'blades/common/colors';
import Fonts from 'blades/common/fonts';
import { fadeout } from 'utils/color-tools';
import parse from 'blades/common/parse';


const { fire, stone, sun } = Colors;

const P = styled.p`
  width: 100%;
  max-width: 38em;
  margin: .5em 0;
  &:first-child {
    margin-top: 0;
  }
  font: ${Fonts.body};
  user-select: text;
  strong {
    font-weight: 500;
  }
`
const Name = styled.span`
  font: ${Fonts.h1};
  font-size: 1.25em;
  margin-right: .5em;
  color: ${sun};
  line-height: .8em;
`

const Ability = (props) => {
  const { name, description } = props;
  let result = null;
  let title = name;
  if (description) {
    result = parse(description);
    title += ':';
  }
  return (
    <P>
        <Name className='name'>{title}</Name>
        {result}
    </P>
  )
}

const { string } = React.PropTypes;
Ability.propTypes = {
  name: string.isRequired
}

export default Ability;
