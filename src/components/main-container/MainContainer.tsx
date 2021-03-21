import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardLayout from '../board/BoardLayout';
import StartGame from '../start-game/StartGame';
import { GameMode, PlayerType } from '../../types';
import { clearGameFromLocalStorage, readGameFromLocalStorage } from '../../LocalStorageHandler';
import { setGameState, startGame, undo } from '../../store/game/actions';

import { $MainContainer, $MainHeader } from './MainContainer.styled';
import BoardMenu from '../board-menu/BoardMenu';
import { selectCells, selectGameMode } from '../../store/game/selectors';
import { getWinner } from '../../utils/game';
import Winner from '../win/Winner';
import DummyAI from '../ai/DummyAI';

type Screen = 'start' | 'main' | 'winner';

const MainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [screen, setScreen] = React.useState<Screen>('start');
  const [winner, setWinner] = React.useState<PlayerType | null>(null);

  const cells = useSelector(selectCells);
  const currentGameMode = useSelector(selectGameMode);

  React.useEffect(() => {
    const currentWinner = getWinner(cells);

    if (currentWinner !== null) {
      setWinner(currentWinner);
      setScreen('winner');
    }
  }, [cells]);

  React.useEffect(() => {
    const savedState = readGameFromLocalStorage();

    if (savedState !== null) {
      dispatch(setGameState(savedState));
      setScreen('main');
    } else {
      setScreen('start');
    }
  }, [dispatch]);

  const openNewGameScreen = React.useCallback(() => {
    clearGameFromLocalStorage();
    setScreen('main');
  }, []);

  const openStartScreen = React.useCallback(() => {
    clearGameFromLocalStorage();
    setScreen('start');
  }, []);

  const onStartGame = React.useCallback((gameMode: GameMode) => {
    dispatch(startGame(gameMode));
    openNewGameScreen();
  }, [dispatch, openNewGameScreen]);

  const onUndo = React.useCallback(() => {
    dispatch(undo());
  }, [dispatch]);

  const getCurrentScreen = () => {
    switch (screen) {
      case 'main':
        return (
          <>
            <BoardLayout />
            <BoardMenu onUndo={onUndo} onStartNewGame={openStartScreen} />
          </>
        );
      case 'winner':
        return (
          <Winner winner={winner} onStartNewGame={openStartScreen} />
        );
      case 'start':
      default:
        return (
          <StartGame onModeSelect={onStartGame} />
        );
    }
  };

  return (
    <$MainContainer>
      <$MainHeader>
        CHECKERS
      </$MainHeader>
      {getCurrentScreen()}
      {currentGameMode === 'AI' && <DummyAI />}
    </$MainContainer>
  );
};

export default MainContainer;
