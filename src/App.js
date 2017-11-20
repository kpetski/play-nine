import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Instructions from './components/Instructions'
import Game from './components/Game'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instructionsShowing: false
    }
  }

  render() {
    return (
      <div>
        <header className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Play Nine</h1>
        </header>
        <Game />
        <footer
          className="footer navbar-fixed-bottom"
          style={{ backgroundColor: 'lightgray' }}><br />
          <div className="App">
            <button
              className="btn-info"
              onClick={() => this.setState({ instructionsShowing: !this.state.instructionsShowing })}>Instructions</button> This game is similar to shut box
              </div><br />
          {this.state.instructionsShowing && <Instructions />}
        </footer>
      </div>
    );
  }
}

export default App;
