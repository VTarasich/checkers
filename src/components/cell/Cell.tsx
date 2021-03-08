import React from 'react';

import { $Cell } from './Cell.styled';
import { getCellIndex } from '../../utils';
import Piece from '../piece/Piece';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  hasOffset: boolean;
}

const Cell: React.FC<CellProps> = ({ rowIndex, colIndex, hasOffset }) => {
  const cellIndex = getCellIndex(rowIndex, colIndex);

  return (
    <$Cell hasOffset={hasOffset}>
      <Piece colIndex={colIndex} rowIndex={rowIndex} />
    </$Cell>
  );
};

export default Cell;
