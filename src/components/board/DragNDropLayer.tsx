import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putPiece } from '../../store/game/actions';
import { selectCurrentPlayer, selectSelectedPieceCoordinates } from '../../store/game/selectors';
import { $Piece, $PieceContainer, $Shadow } from '../piece/Piece.styled';

const DragNDropLayer: React.FC = () => {
  const pieceElementRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const selectedPieceCoordinates = useSelector(selectSelectedPieceCoordinates);
  const player = useSelector(selectCurrentPlayer);

  const onMouseDown = React.useCallback((event: MouseEvent) => {
    if (selectedPieceCoordinates || !pieceElementRef.current) {
      return;
    }
    pieceElementRef.current.style.top = `${event.clientY - 22.5}px`;
    pieceElementRef.current.style.left = `${event.clientX - 22.5}px`;
  }, [pieceElementRef, selectedPieceCoordinates]);

  const onMouseUp = React.useCallback(() => {
    if (!selectedPieceCoordinates) {
      return;
    }
    dispatch(putPiece(selectedPieceCoordinates));
  }, [dispatch, selectedPieceCoordinates]);

  const onMouseMove = React.useCallback((event: MouseEvent) => {
    if (!selectedPieceCoordinates || !pieceElementRef.current) {
      return;
    }

    pieceElementRef.current.style.top = `${event.clientY - 22.5}px`;
    pieceElementRef.current.style.left = `${event.clientX - 22.5}px`;
  }, [selectedPieceCoordinates, pieceElementRef]);

  React.useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  return (
    <$PieceContainer
      isRisen
      ref={pieceElementRef}
      isVisible={!!selectedPieceCoordinates}
      isInteractive={false}
      isPieceHit={false}
      pieceColor={player}
    >
      <$Shadow isVisible={!!selectedPieceCoordinates} />
      <$Piece
        pieceColor={player}
        isRisen
      />
    </$PieceContainer>
  );
};

export default DragNDropLayer;
