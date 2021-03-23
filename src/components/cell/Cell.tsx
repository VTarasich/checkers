import React from 'react';

import Piece from '../piece/Piece';
import { Coordinate } from '../../types';

import useGetCellHighlight from './useGetCellHighlight';
import useGetCellAction from './useGetCellAction';

import { $Cell } from './Cell.styled';

interface CellProps {
  coordinate: Coordinate,
  hasOffset: boolean;
}

const Cell: React.FC<CellProps> = ({ coordinate, hasOffset }) => {
  const highlight = useGetCellHighlight(coordinate);
  const onMouseUp = useGetCellAction(coordinate);

  return (
    <$Cell
      onMouseUp={onMouseUp}
      hasOffset={hasOffset}
      highlight={highlight}
    >
      <Piece coordinate={coordinate} />
    </$Cell>
  );
};

export default Cell;
