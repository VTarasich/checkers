import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BoardLayout from '../board/BoardLayout';
import StartGame from '../start-game/StartGame';
import { GameMode, PlayerType } from '../../types';
import { clearGameFromLocalStorage, readGameFromLocalStorage } from '../../LocalStorageHandler';
import { setGameState, startGame, undo } from '../../store/game/actions';
import BoardMenu from '../board-menu/BoardMenu';
import { selectCells } from '../../store/game/selectors';
import { getWinner } from '../../utils/game';
import Winner from '../winner/Winner';

type Screen = 'start' | 'main' | 'winner';

const MainContainerContent: React.FC = () => {
  const dispatch = useDispatch();

  const [screen, setScreen] = React.useState<Screen>('start');
  const [winner, setWinner] = React.useState<PlayerType | null>(null);

  const cells = useSelector(selectCells);

  // track winner
  React.useEffect(() => {
    const currentWinner = getWinner(cells);

    if (currentWinner !== null) {
      setWinner(currentWinner);
      setScreen('winner');
    }
  }, [cells]);

  // load game from local storage on mount
  React.useEffect(() => {
    const savedState = readGameFromLocalStorage();

    if (savedState !== null) {
      dispatch(setGameState(savedState));
      setScreen('main');
    } else {
      setScreen('start');
    }
  }, [dispatch]);

  const openStartScreen = React.useCallback(() => {
    clearGameFromLocalStorage();
    setScreen('start');
  }, []);

  const onStartGame = React.useCallback((gameMode: GameMode) => {
    dispatch(startGame(gameMode));
    clearGameFromLocalStorage();
    setScreen('main');
  }, [dispatch]);

  const onUndo = () => {
    dispatch(undo());
  };

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

export default MainContainerContent;
