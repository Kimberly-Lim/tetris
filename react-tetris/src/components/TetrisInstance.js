import React, { useState, useEffect, useCallback } from 'react';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage, checkCollision } from '../gameHelpers';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const TetrisInstance = ({ 
  controls = { left: 37, right: 39, down: 40, rotate: 38 }, playerNumber }) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = useCallback(
    dir => {
      if (!checkCollision(player, stage, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0 });
      }
    },
    [player, stage, updatePlayerPos]
  );

  const drop = useCallback(() => {
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [rows, level, player, stage, updatePlayerPos, setLevel]);

  const dropPlayer = useCallback(() => {
    setDropTime(null);
    drop();
  }, [drop]);

  const keyUp = useCallback(
    ({ keyCode }) => {
      if (!gameOver && keyCode === controls.down) {
        setDropTime(1000 / (level + 1));
      }
    },
    [gameOver, controls.down, level]
  );

  const move = useCallback(
    ({ keyCode }) => {
      if (!gameOver) {
        if (keyCode === controls.left) {
          movePlayer(-1);
        } else if (keyCode === controls.right) {
          movePlayer(1);
        } else if (keyCode === controls.down) {
          dropPlayer();
        } else if (keyCode === controls.rotate) {
          playerRotate(stage, 1);
        }
      }
    },
    [gameOver, controls, movePlayer, dropPlayer, playerRotate, stage]
  );

  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    const handleKeyDown = e => move(e);
    const handleKeyUp = e => keyUp(e);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [move, keyUp]);

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" playerNumber={playerNumber} />
          ) : (
            <div>
              <Display text={`Score: ${score}`} playerNumber={playerNumber} />
              <Display text={`rows: ${rows}`} playerNumber={playerNumber} />
              <Display text={`Level: ${level}`} playerNumber={playerNumber} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default TetrisInstance;
