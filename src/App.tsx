import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectionArea from './components/SelectionArea/SelectionArea';

export interface State {
  // todo: figure out how to store a reference to the active component
  text?: string,
  updateChildren: boolean;
  intervalSpeed: number;
  scrollOffset: any;
  activeSelection: number;
  letterList: string[];
}
export interface Props {}

class App extends Component<Props, State> {

  private MAX_INTERVAL_SPEED = 250;
  private MIN_INTERVAL_SPEED = 5000;

  constructor(props: Props){
    super(props);
    this.state = {
      text:           undefined,
      updateChildren: false,
      intervalSpeed:  this.MAX_INTERVAL_SPEED,
      scrollOffset: {},
      activeSelection: 0,
      letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    } as State

    this.onRightClick = this.onRightClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  public componentDidMount() {
    document.onkeydown = this.onKeyPress;
  }

  public render() {
    return (
      <div className="App" onClick = {this.onClick} onContextMenu={this.onRightClick}>
        <div className = "app-container">
          <SelectionArea 
            charList = { this.state.letterList }
            isActive = { this.state.activeSelection == 0 }
            onClick = {this.onGlobalClick}
            parentClicked = { this.state.updateChildren }
            intervalSpeed = { this.state.intervalSpeed }  
            />
          <SelectionArea 
            charList = { ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] }
            isActive = { this.state.activeSelection == 1 }
            onClick = {this.onGlobalClick}
            parentClicked = {false}
            intervalSpeed = { this.state.intervalSpeed }  
            />
          <SelectionArea 
            charList = { ['.',',','?','!','(',')',';','/','&','$','%','@','^','*','_','-','+','=',':','<','>'] }
            isActive = { this.state.activeSelection == 2 }
            onClick = {this.onGlobalClick}
            parentClicked = {false}
            intervalSpeed = { this.state.intervalSpeed }  
            />
          <textarea ref = {input => input && input.focus()}className = "c-textbox" placeholder="Please type something..." autoFocus value = {this.state.text} onChange={this.onTextChange} onClick={this.onTextClick}/>
        </div>
      </div>
    );
  }

  private onClick = (e: any) => {
    if (e.target.className != 'app-container' && e.target.className != 'App')
      return;
    this.setState({
      updateChildren : true
    })
  }

  private onGlobalClick = (selectedChar: string) => {
    let newText = this.state.text ? this.state.text : '';
    newText += selectedChar;

    this.setState({
      text: newText,
      updateChildren: false
    });
  }

  private onRightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (this.state.text == undefined)
      return;

    let text = this.state.text + " ";
    this.setState({
      text
    });
  }

  private onTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // if text is changed manually, update the global text
    let newText = e.currentTarget.value;
    this.setState({
        text: newText
    });
  }

  private onTextClick = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  }

  private onKeyPress(e: any) {
    switch (e.keyCode) {
      case '16':
        this.handleShiftPress();
        break;
      case '38':
      case '40':
        this.handleArrowPress(e.keyCode);
        break;
      default:
        break;
    }
  }

  private handleShiftPress() {
    let letterList = this.state.letterList;
    let isCapital = letterList[0] == 'A';

    letterList = letterList.map(c => {
      return isCapital ? c.toLowerCase() : c.toUpperCase();
    });
    

    this.setState({
      letterList
    });
  }

  private handleArrowPress(keyCode: string) {
    let activeSelection = this.state.activeSelection;

    if (keyCode == '38') {
        // up arrow
        activeSelection = activeSelection == 0 ? 2 : activeSelection - 1;
    }
    else if (keyCode == '40') {
        // down arrow
        activeSelection = activeSelection == 2 ? 0 : activeSelection + 1;
    }
    this.setState({
      activeSelection
    })
  }
}

export default App;
