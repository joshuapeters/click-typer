import React, { Component } from 'react';
import logo from './logo.svg';
import './SelectionArea.css';
import CharacterCard from '../CharacterCard/CharacterCard';

export interface State {
  selectedCharIndex : number;
}

export interface Props {
  charList      : [],
  isActive      : boolean,
  text          : string
  parentClicked : boolean;
  onClick       : (newText: string) => void
}

class SelectionArea extends Component<Props, State>  {

  private _interval: number | undefined;

  public componentDidMount() {
    this.setState({
      selectedCharIndex : 0
    })
  }

  public componentDidUpdate(prevProps: Props) {
    const nextIndex = this._getNextIndex();
    this.setState({
      selectedCharIndex : nextIndex
    });

    this._updateInterval(prevProps);

    this._updateParent();
  }

  public componentWillUnmount() {
    clearInterval(this._interval);
  }

  public render() {
    const charList = this.props.charList;
    return (
      <div className="c-selection-area">
        {
          charList.map( (c, i) => {
            return (
              <CharacterCard character = {c} isSelected = { i == this.state.selectedCharIndex && this.props.isActive }/>
            )
          })
        }
      </div>
    );
  }

  private _getNextIndex() {
    // if the selected index has been set, and we're not at the last index of the character array, increment it. Otherwise start over
    let currentIndex = this.state.selectedCharIndex;
    let isLastIndex = currentIndex == this.props.charList.length -1;

    return currentIndex && isLastIndex ? this.state.selectedCharIndex + 1 : 0;
  }

  private _getNewText() {
    return this.props.text +
           this.props.charList[this.state.selectedCharIndex];
  }

  private _updateParent() {
    if (this.props.parentClicked)
      return;

    const newText = this._getNewText();
    this.props.onClick(newText);
  }

  private _updateInterval(prevProps: Props) {
    // if we were not previously active and we still are...
    if (!prevProps.isActive && this.props.isActive)
      this._interval = setInterval(() => this.setState({
          selectedCharIndex: this._getNextIndex()
        })
      );

    // if we were previously active and now we're not...
    if (prevProps.isActive && !this.props.isActive)
      clearInterval(this._interval);
  }
}

export default SelectionArea;
