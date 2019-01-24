import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectionArea from './components/SelectionArea/SelectionArea';

export interface State {
  // todo: figure out how to store a reference to the active component
  text?: string,
  updateChildren: boolean;
}
export interface Props {}

class App extends Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {
      text:           undefined,
      updateChildren: false,
    } as State
  }

  public render() {
    return (
      <div className="App" onClick = {this.onClick}>
        <div className = "app-container">
          <SelectionArea 
            charList = { ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] }
            isActive = { true }
            onClick = {this.onGlobalClick}
            parentClicked = { this.state.updateChildren }
            intervalSpeed = { 500 }  
            />
          <SelectionArea 
            charList = { ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] }
            isActive = { false }
            onClick = {this.onGlobalClick}
            parentClicked = {false}
            intervalSpeed = { 2000 }  
            />
          <SelectionArea 
            charList = { ['.',',','?','!','(',')',';','/','&','$','%','@','^','*','_','-','+','=',':','<','>'] }
            isActive = { false }
            onClick = {this.onGlobalClick}
            parentClicked = {false}
            intervalSpeed = { 2000 }  
            />
          <textarea className = "c-textbox" placeholder="Please type something..." value = {this.state.text} onChange={this.onTextChange} onClick={this.onTextClick}/>
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

  private onTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // if text is changed manually, update the global text
    let newText = e.currentTarget.value;
    this.setState({
        text: newText
    })
  }

  private onTextClick = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  }
}

export default App;
