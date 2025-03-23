
import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';
//shows a player label if provided
const Display = ({ gameOver, text, playerNumber }) => (
  <StyledDisplay gameOver={gameOver}>
    {typeof playerNumber !== undefined && <div className="player-label">Player {playerNumber}</div>}
    {text}
    </StyledDisplay>
);

export default Display;
