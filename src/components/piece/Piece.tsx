import React, { MouseEventHandler } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { $Piece, $PieceContainer } from './Piece.styled';
import { getCellIndex } from '../../utils/common';
import {
  getSelectIsPieceAvailable,
  getSelectIsPieceRisen,
  getSelectPieceState,
  selectCurrentPlayer,
  selectSelectedPieceCoordinates,
} from '../../store/game/selectors';
import { hoverPiece, risePiece } from '../../store/game/actions';
import { Coordinate } from '../../types';
import { useIsPieceHit } from '../cell/Cell';
import { AI_PLAYER } from '../ai/DummyAI';

interface CellProps {
  coordinate: Coordinate;
}

const Piece: React.FC<CellProps> = ({ coordinate }) => {
  const cellIndex = getCellIndex(coordinate);
  const pieceElementRef = React.createRef<HTMLDivElement>();

  const dispatch = useDispatch();
  const piece = useSelector(getSelectPieceState(cellIndex));
  const isRisen = useSelector(getSelectIsPieceRisen(cellIndex));
  const isAvailable = useSelector(getSelectIsPieceAvailable(coordinate));
  const selectedPieceCoordinates = useSelector(selectSelectedPieceCoordinates);
  const currentPlayer = useSelector(selectCurrentPlayer);

  const isPieceHit = useIsPieceHit(coordinate);

  const isPieceInteractive = currentPlayer !== AI_PLAYER && isAvailable;

  const onKeyDown = () => {
    if (!piece || currentPlayer !== piece.color) {
      return;
    }

    dispatch(risePiece(coordinate));
  };

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    if (currentPlayer !== piece?.color || selectedPieceCoordinates) {
      return;
    }

    dispatch(hoverPiece(coordinate));
  };

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    if (currentPlayer !== piece?.color || selectedPieceCoordinates) {
      return;
    }

    dispatch(hoverPiece(null));
  };

  return piece
    ? (
      <$PieceContainer
        ref={pieceElementRef}
        isRisen={isRisen}
        isVisible={!isRisen}
        isPieceHit={isPieceHit}
        pieceColor={piece.color}
        isInteractive={isPieceInteractive}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <$Piece
          onMouseDown={onKeyDown}
          pieceColor={piece.color}
          isRisen={false}
        />
      </$PieceContainer>
    )
    : null;
};

export default Piece;
