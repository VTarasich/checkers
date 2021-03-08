import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { $Cell, $Piece } from './Cell.styled';
import { risePiece, selectGameState } from '../../store/game';
import { getCellIndex } from '../../utils';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  hasOffset: boolean;
}

const Cell: React.FC<CellProps> = ({ rowIndex, colIndex, hasOffset }) => {
  const dispatch = useDispatch();
  const gameState = useSelector(selectGameState);
  const cellIndex = getCellIndex(rowIndex, colIndex);

  const cell = gameState[cellIndex];

  const togglePiece = () => dispatch(risePiece(cellIndex));

  console.log('>>>', 'render', cellIndex);

  return (
    <$Cell hasOffset={hasOffset}>
      {cell && cell.piece
        ? (
          <$Piece
            onClick={togglePiece}
            color={cell.piece.color}
            isRisen={cell.piece.isRisen}
          />
        )
        : null}
    </$Cell>
  );
};

export default Cell;
