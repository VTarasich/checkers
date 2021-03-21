import { createGlobalStyle, css } from 'styled-components';

export const BOARD_SIZE_PX = 440;

export const CELL_SIZE = BOARD_SIZE_PX / 8;

export const COLOR_BLACK = '#222';
export const COLOR_WHITE = '#ffece4';

export const COLOR_MAIN = '#ff804d';
export const COLOR_ACCENT = '#fb5';

export const getDottedPattern = (sizePx = 2, color = COLOR_BLACK) => css`
  background-image:
    linear-gradient(45deg, ${color} 25%, transparent 25%),
    linear-gradient(-45deg, ${color} 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, ${color} 75%),
    linear-gradient(-45deg, transparent 75%, ${color} 75%);
  background-size: ${sizePx}px ${sizePx}px;
  background-position: 0 0, 0 ${sizePx / 2}px, ${sizePx / 2}px -${sizePx / 2}px, -${sizePx / 2}px 0px;
`;

export const getStripedPattern = (sizePx = 2, color = COLOR_BLACK) => css`
  background-image: linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 50%, ${color} 50%, ${color} 75%, transparent 75%, transparent 100%);
  background-size: ${sizePx * 2}px ${sizePx * 2}px;
`;

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: 'Courier New', monospace;
    background: #ff804d;
    user-select: none;
  }
`;
