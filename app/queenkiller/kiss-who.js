import React from 'react';
import rx from 'resplendence';
import CommonButton from 'common/button';

import connect from 'utils/connect'

const Container = 'div';
const Button = rx(CommonButton)`--1
  color: white;
`
const Innocent = 'p';
const Murderous = rx('p')`
  color: red;
`

class BaseKissButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.kiss = this.kiss.bind(this);
  }
  kiss() {
    const { dispatch, who } = this.props;
    dispatch('kiss', who);
  }
  render() {
    const { name } = this.props;
    return (
      <Button onClick={this.kiss}>=>{name}</Button>
    )
  }
}

const KissButton = connect(BaseKissButton);

class KissWho extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
  }
  cancel() {
    const { dispatch } = this.props;
    dispatch('navigate', 'play');
  }
  render() {
    const { characters, me } = this.props;
    const buttons = [];
    const ids = Object.keys(characters);
    for (let i=0; i< ids.length; i++) {
      const id = ids[i];
      const character = characters[id];
      if (id != me) {
        buttons.push(
          <KissButton key={id} who={id} name={character.name}/>
        )
      }
    }
    return (
      <Container>
        <p>Who are you sharing a kiss with?</p>
        <p>
          {buttons}
        </p>
        <Button onClick={this.cancel}>=>Nevermind</Button>
      </Container>
    )
  }
}

const { bool, func } = React.PropTypes;
KissWho.propTypes = {
  dispatch: func.isRequired
};

export default connect(KissWho);
