import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export interface State {
  // todo: figure out how to store a reference to the active component
  activeComponent : object,
  text: string
}
export interface Props {}

class App extends Component<Props, State> {
  public render() {
    return (
      <div className="App" onClick = {this.onGlobalClick}>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <input type="text" placeholder="Please type something..." value = {this.state.text} onChange={this.onTextChange}/>
        </div>
      </div>
    );
  }

  private onGlobalClick() {
    // todo: take whatever character is currently selected, and append it to the current text
  }

  private onTextChange(e: React.FormEvent<HTMLInputElement>) {
    // if text is changed manually, update the global text
    let newText = e.currentTarget.value;
    this.setState({
        text: newText
    })
  }
}

export default App;
