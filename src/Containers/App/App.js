import React, { Component } from 'react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
// import Components
import Menu from '../../Components/Menu/Menu';
import Instructions from '../../Components/Instructions/Instructions';
import Rectangle from '../../Components/Rectangle/Rectangle';

class App extends Component {
  render() {

    let links = [
      {title: "Markov chain", active: true},
      {title: "Cellular automaton", active: false}
    ];

    return (
      <div className="App">
        <Canvas width="800" height="400" cells="20"/>
        <Instructions>

        </Instructions>
        <header className="App-header">
          <div className="App-logo">Paper&#123; &#125;</div>
          <Menu links={links}></Menu>
        </header>
      </div>
    );
  }
}

export default App;
