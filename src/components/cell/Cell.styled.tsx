import styled, { css } from 'styled-components';
import { CELL_SIZE, COLOR_MAIN, getStripedPattern } from '../../common.styled';

export type CellHighLight = 'none' | 'hit' | 'available';

const getBackgroundColor = (highlight: CellHighLight) => {
  switch (highlight) {
    case 'available': {
      return getStripedPattern(2, 'rgba(255, 255, 255, 0.5)');
    }
    case 'hit': {
      return getStripedPattern(2, 'rgba(255, 0, 0, 0.5)');
    }
    case 'none':
    default: {
      return css`
        background: ${COLOR_MAIN};
      `;
    }
  }
};

export const $Cell = styled.div<{highlight: CellHighLight; hasOffset?: boolean}>`
  position: relative;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: ${COLOR_MAIN};
  
  ${(props) => props.hasOffset && css`
    margin-left: ${CELL_SIZE}px;
  `}
  
  ${(props) => getBackgroundColor(props.highlight)};
`;
