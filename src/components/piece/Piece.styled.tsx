import styled, { css } from 'styled-components';

const CELL_SIZE = 12.5;

export type PieceColor = 'white' | 'black';

export const $Piece = styled.div<{ color: PieceColor; isRisen: boolean }>`
  width: ${CELL_SIZE * 7}%;
  height: ${CELL_SIZE * 7}%;
  border-radius: 50%;
  background-color: ${(props) => (props.color === 'white' ? '#fff' : '#ff0004')};
  ${({ isRisen }) => isRisen && css`
    border: 3px solid blue;
  `}
`;
