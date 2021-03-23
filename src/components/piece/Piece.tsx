import React, { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSelectIsPieceRisen,
  getSelectPieceState,
  selectCurrentPlayer,
  selectSelectedPieceCoordinate,
} from '../../store/game/selectors';
import { hoverPiece, risePiece } from '../../store/game/actions';
import { Coordinate } from '../../types';
import useIsCellUnderHit from '../../hooks/useIsCellUnderHit';

import useIsPieceInteractive from './useIsPieceInteractive';
import useIsPieceMandatoryToMakeTurn from './useIsPieceMandatoryToMakeTurn';

import { $Piece, $PieceContainer } from './Piece.styled';

interface CellProps {
  coordinate: Coordinate;
}

const Piece: React.FC<CellProps> = ({ coordinate }) => {
  const dispatch = useDispatch();
  const pieceElementRef = React.createRef<HTMLDivElement>();

  const piece = useSelector(getSelectPieceState(coordinate));
  const isRisen = useSelector(getSelectIsPieceRisen(coordinate));
  const selectedPieceCoordinates = useSelector(selectSelectedPieceCoordinate);
  const currentPlayer = useSelector(selectCurrentPlayer);

  const isPieceHit = useIsCellUnderHit(coordinate);
  const isMandatory = useIsPieceMandatoryToMakeTurn(coordinate);
  const isPieceInteractive = useIsPieceInteractive(coordinate);

  const onKeyDown = React.useCallback(() => {
    if (!piece || currentPlayer !== piece.color) {
      return;
    }

    dispatch(risePiece(coordinate));
  }, [dispatch, piece, currentPlayer, coordinate]);

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = React.useCallback(() => {
    if (currentPlayer !== piece?.color || selectedPieceCoordinates) {
      return;
    }

    dispatch(hoverPiece(coordinate));
  }, [dispatch, coordinate, currentPlayer, piece, selectedPieceCoordinates]);

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = React.useCallback(() => {
    if (currentPlayer !== piece?.color || selectedPieceCoordinates) {
      return;
    }

    dispatch(hoverPiece(null));
  }, [dispatch, currentPlayer, piece, selectedPieceCoordinates]);

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
          isMandatory={isMandatory}
          isQueen={piece.isQueen}
          isRisen={false}
        />
      </$PieceContainer>
    )
    : null;
};

export default Piece;
