import React from 'react';
import { useSelector } from 'react-redux';
import Cell from '../cell/Cell';
import { createBoardSchema, getCellIndex } from '../../utils/common';
import { selectCurrentPlayer, selectGameMode } from '../../store/game/selectors';

import DragNDropLayer from './DragNDropLayer';

import { $Board, $PlayerName } from './BoardLayout.styled';

const defaultSchema = createBoardSchema();

const BoardLayout: React.FC = () => {
  const activePlayer = useSelector(selectCurrentPlayer);
  const gameMode = useSelector(selectGameMode);

  return (
    <>
      <DragNDropLayer />
      <$PlayerName
        position="top"
        isActive={activePlayer === 'black'}
      >
        {gameMode === 'AI' ? 'Dummy AI' : 'Player 2'}
      </$PlayerName>
      <$Board>
        {defaultSchema
          .map((row, rowIndex) => row
            .map((cell, colIndex) => {
              const prevCell = row[colIndex - 1];
              const coordinates = {
                colIndex,
                rowIndex,
              };
              return (
                cell
                  ? (
                    <Cell
                    // eslint-disable-next-line react/no-array-index-key
                      key={getCellIndex({ rowIndex, colIndex })}
                      coordinate={coordinates}
                      hasOffset={prevCell !== undefined && !prevCell}
                    />
                  )
                  : null
              );
            }))}
      </$Board>
      <$PlayerName
        position="bottom"
        isActive={activePlayer === 'white'}
      >
        Player 1
      </$PlayerName>
    </>
  );
};

export default BoardLayout;
