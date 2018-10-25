import React, { Component } from 'react';
import electronLogo from './electron-logo.svg';
import reactLogo from './react-logo.svg';
import './App.css';
import process from 'process';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Logos">
            <img src={electronLogo} className="App-logo" alt="logo" />
            <img src={reactLogo} className="App-logo" alt="logo" />
          </div>
          <p>
            Electron ({process.versions.electron}) - React ({React.version})
          </p>
          <p>
            <a
              className="App-link"
              href="https://electronjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Electron
          </a> - <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Reaact
          </a>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
