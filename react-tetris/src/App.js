import React from 'react';
import Tetris from './components/Tetris';
import MultiplayerTetris from './components/MultiplayerTetris';

const App = () => (
  <div className = "App">
    <Tetris />
    <MultiplayerTetris />
  </div>
);

// const App = () => (
//   <div className="App">
//     <TetrisMultiplayer />
//   </div>
// );

export default App;