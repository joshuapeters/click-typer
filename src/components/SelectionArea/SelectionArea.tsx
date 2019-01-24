import React, { Component } from 'react';
import './SelectionArea.css';
import CharacterCard from '../CharacterCard/CharacterCard';

export interface State {
  selectedCharIndex : number;
}

export interface Props {
  charList      : string[];
  isActive      : boolean;
  parentClicked : boolean;
  onClick       : (selectedChar: string) => void;
  intervalSpeed : number;
}

class SelectionArea extends Component<Props, State>  {

  private _interval: number| undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedCharIndex: 0
    } as State;

    this._updateIndex = this._updateIndex.bind(this)
  }

  public componentDidMount() {
    this.startInterval()
  } 

  public componentDidUpdate(prevProps: Props) {
    this._updateInterval(prevProps);

    this._updateParent();
  }

  public componentWillUnmount() {
    clearInterval(this._interval);
  }

  public render() {
    const charList = this.props.charList;
    const className = this.props.isActive ? "c-selection-area -active" : "c-selection-area";
    return (
      <div className = { className }>
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

  private async _updateIndex() {
    if (!this.props.isActive)
      return;

    // if the selected index has been set, and we're not at the last index of the character array, increment it. Otherwise start over
    let currentIndex = this.state.selectedCharIndex;
    let isLastIndex = currentIndex == this.props.charList.length -1;

    const nextIndex = currentIndex >= 0 && !isLastIndex ? this.state.selectedCharIndex + 1 : 0;
    
    return this.setState({
      selectedCharIndex: nextIndex
    });
  }

  private _updateParent() {
    if (!this.props.parentClicked)
      return;
    
    const selectedChar = this.props.charList[this.state.selectedCharIndex];

    this.props.onClick(selectedChar);
  }

  private _updateInterval(prevProps: Props) {
    // if we were not previously active and we still are...
    if (!prevProps.isActive && this.props.isActive)
      this.startInterval()

    // if we were previously active and now we're not...
    if (prevProps.isActive && !this.props.isActive)
      clearInterval(this._interval);
  }

  private startInterval() {
    this._interval = window.setInterval(this._updateIndex, this.props.intervalSpeed);
  }
}

export default SelectionArea;
