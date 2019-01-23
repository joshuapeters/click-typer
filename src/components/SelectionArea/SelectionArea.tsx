import React, { Component } from 'react';
import logo from './logo.svg';
import './SelectionArea.css';

export interface State {
  selectedCharIndex : number;
}

export interface Props {
  charList : [],
  isActive : boolean,
  text     : string
  onClick  : (newText: string) => void
}

class SelectionArea extends Component<Props, State>  {
  public render() {
    const charList = this.props.charList;
    return (
      <div className="c-selection-area">
        {
          // todo: create list out of chars
          charList.map(c => c)
        }
      </div>
    );
  }
}

export default SelectionArea;
