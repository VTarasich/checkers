import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { $Piece } from './Piece.styled';
import { getCellIndex } from '../../utils';
import { getSelectPieceState } from '../../store/game/selectors';
import { risePiece } from '../../store/game/actions';

interface CellProps {
  rowIndex: number;
  colIndex: number;
}

const Piece: React.FC<CellProps> = ({ rowIndex, colIndex }) => {
  const cellIndex = getCellIndex(rowIndex, colIndex);

  const dispatch = useDispatch();
  const piece = useSelector(getSelectPieceState(cellIndex));

  const togglePiece = () => dispatch(risePiece(cellIndex));

  return piece
    ? (
      <$Piece
        onClick={togglePiece}
        color={piece.color}
        isRisen={piece.isRisen}
      />
    )
    : null;
};

export default Piece;
