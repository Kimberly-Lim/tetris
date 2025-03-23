import React, { useEffect } from 'react';
import TetrisInstance from './TetrisInstance';
import styled from 'styled-components';

const MultiplayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const MultiplayerTetris = () => {
  

  const controlsPlayer1 = {
    // left: 65,    // 'A'
    // right: 68,   // 'D'
    // down: 83,    // 'S'
    // rotate: 87,  // 'W'
    left: 37,    // Arrow Left
    right: 39,   // Arrow Right
    down: 40,    // Arrow Down
    rotate: 38,  // Arrow Up
  };

  const controlsPlayer2 = {
    left: 65,    // 'A'
    right: 68,   // 'D'
    down: 83,    // 'S'
    rotate: 87,  // 'W'
  };

  return (
    <MultiplayerWrapper>
      <TetrisInstance controls={controlsPlayer1} playerNumber={1} />
      <TetrisInstance controls={controlsPlayer2} playerNumber={2} />
    </MultiplayerWrapper>
  );
};

export default MultiplayerTetris;
