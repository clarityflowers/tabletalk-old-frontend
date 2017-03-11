import React from 'react';
import Button from './button';
import CommonAbility from 'blades/window/common/abilities/ability';

class Ability extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { name, onAdd } = this.props;
    onAdd(name);
  }
  render() {
    const { name, onAdd, ...rest } = this.props;
    return (
        <Button onClick={this.handleClick}>
          <CommonAbility name={name} {...rest}/>
        </Button>
    )
  }
}

const { string, func } = React.PropTypes;
Ability.propTypes = {
  name: string.isRequired,
  onAdd: func.isRequired
}

export default Ability;
