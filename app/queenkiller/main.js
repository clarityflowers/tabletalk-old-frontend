import React from 'react';
import styled from 'styled-components';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = styled.div`
`
const List = styled.ul`
  margin: 0 1.5em;
  padding: 0;
`
const Item = styled.li`
  padding: 0;
`
const Button = styled(CommonButton)`
  color: white;
  display: block;
`

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ready = this.ready.bind(this);
    this.kiss = this.kiss.bind(this);
    this.kill = this.kill.bind(this);
    this.claim = this.claim.bind(this);
  }
  ready() {
    const { dispatch } = this.props;
    dispatch('ready');
  }
  kiss() {
    const { dispatch } = this.props;
    dispatch('navigate', 'kiss who');
  }
  kill() {
    const { dispatch } = this.props;
    dispatch('navigate', 'kill who');
  }
  claim() {
    const { dispatch } = this.props;
    dispatch('navigate', 'really claim');
  }
  render() {
    const { characters } = this.props;
    const ids = Object.keys(characters);
    let character = null;
    let names = [];
    for (let i=0; i < ids.length; i++) {
      const id = ids[i];
      names.push(characters[id].name);
    }
    return (
      <Container>
        <p>The characters are: {names.join(", ")}</p>
        <p>You can:</p>
        <List>
          <Item>Say or act out what you do (not what happens)</Item>
          <Item>Ask a player a question</Item>
          <Item>Answer a question with anything (except another's actions or beliefs)</Item>
        </List>
        <p>If you share a kiss, you learn each other's innocence and worthiness</p>
        <p>If you attempt murder, they choose: give you what you want, or toss a coin; the loser dies.</p>
        <p>If you touch the crown, your worthiness is revealed. The unworthy die.</p>
        <p>The game ends when the living recognize a ruler, or we run out of time and all die</p>
        <Button onClick={this.kiss}>=>Share a kiss</Button>
        <Button onClick={this.claim}>=>Touch the crown</Button>
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
Main.propTypes = {
  dispatch: func.isRequired
};

export default connect(Main);
