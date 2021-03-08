import styled, { css } from 'styled-components';

const CELL_SIZE = 12.5;

export type PieceColor = 'white' | 'black';

export const $Cell = styled.div<{hasOffset?: boolean}>`
  width: ${CELL_SIZE}%;
  height: ${CELL_SIZE}%;
  background: #000;
  
  ${(props) => props.hasOffset && css`
    margin-left: ${CELL_SIZE}%;
  `}
`;
