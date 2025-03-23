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

    left: 65,    // 'A'
    right: 68,   // 'D'
    down: 83,    // 'S'
    rotate: 87,  // 'W'
  };

  const controlsPlayer2 = {
    left: 37,    // Arrow Left
    right: 39,   // Arrow Right
    down: 40,    // Arrow Down
    rotate: 38,  // Arrow Up
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Collect all game control keys into an array
      const gameKeys = [...Object.values(controlsPlayer1), ...Object.values(controlsPlayer2)];
      if (gameKeys.includes(event.keyCode)) {
        event.preventDefault();  // Prevent the default action for game control keys
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [controlsPlayer1, controlsPlayer2]);  // Empty dependency array means the effect runs only on mount and unmount

  return (
    <MultiplayerWrapper>
      <TetrisInstance controls={controlsPlayer1} playerNumber={1} />
      <TetrisInstance controls={controlsPlayer2} playerNumber={2} />
    </MultiplayerWrapper>
  );
};

export default MultiplayerTetris;
