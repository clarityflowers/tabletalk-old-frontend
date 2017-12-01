import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Socket } from 'phoenix';

class App extends Component {
  state = {
    messages: [],
    text: ""
  };

  componentWillMount() {
    let socket = new Socket("ws://localhost:4000/socket", {params: {userToken: "123"}});
    socket.connect();
    this.channel = socket.channel("room:123", {token: "test"});
    this.channel.on("new_msg", this.handleMessage);
    this.channel.join()
    .receive("ok", resp => console.log("Joined successfully", resp))
    .receive("error", resp => { console.log("Unable to join", resp)})
  }
  handleMessage = (msg) => {
    console.log("message: " + msg.body);
    this.setState({messages: [...this.state.messages, msg.body]})
  } 
  handleChanged = (e) => {
    this.setState({text: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    this.channel.push("new_msg", {body: text})
    this.setState({text: ""});
  }
  render() {
    let i=0;
    const msgs = this.state.messages.map(msg => <div key={i++}>{msg}</div>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChanged} />
        </form>
        <div>
          {msgs}
        </div>
      </div>
    );
  }
}

export default App;
