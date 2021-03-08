import React from 'react';

import $Board from './BoardLayout.styled';
import Cell from '../cell/Cell';
import { createBoardSchema, getCellIndex } from '../../utils';

const defaultSchema = createBoardSchema();

const BoardLayout: React.FC = () => (
  <$Board>
    {defaultSchema
      .map((row, rowIndex) => row
        .map((cell, colIndex) => {
          const prevCell = row[colIndex - 1];
          return (
            cell
              ? (
                <Cell
                  // eslint-disable-next-line react/no-array-index-key
                  key={getCellIndex(rowIndex, colIndex)}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  hasOffset={prevCell !== undefined && !prevCell}
                />
              )
              : null
          );
        }))}
  </$Board>
);

export default BoardLayout;
