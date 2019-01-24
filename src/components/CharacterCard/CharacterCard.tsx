import React, { Component } from 'react';
import logo from './logo.svg';
import './CharacterCard.css';

export interface State {
}

export interface Props {
  character : string,
  isSelected : boolean
}

class CharacterCard extends Component<Props, State>  {
  public render() {
    const className = this.props.isSelected ? "c-character-card -selected" : "c-character-card"
    return (
      <div className = { className }>
        {
          this.props.character
        }
      </div>
    );
  }
}

export default CharacterCard;
