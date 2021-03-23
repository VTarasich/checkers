import styled, { css } from 'styled-components';

import {
  CELL_SIZE, COLOR_ACCENT, COLOR_BLACK, COLOR_WHITE, getDottedPattern,
} from '../../common.styled';
import { Color } from '../../types';

interface PieceContainerProps {
  isRisen: boolean;
  isVisible: boolean;
  isPieceHit: boolean;
  pieceColor: Color;
  isInteractive?: boolean
}

export const $PieceContainer = styled.div<PieceContainerProps>`
  position: ${({ isRisen }) => (isRisen ? 'fixed' : 'relative')};
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  z-index: ${({ isRisen }) => (isRisen ? 10 : 1)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  
  cursor: ${({ isRisen }) => (isRisen ? 'grabbing' : 'grab')};
  pointer-events: ${({ isInteractive }) => (isInteractive ? 'all' : 'none')};
  
  ${(props) => props.isPieceHit && css`
    &:after,
    &:before {
      position: absolute;
      display: block;
      width: 2px;
      height: ${CELL_SIZE}px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: ${props.pieceColor === 'white' ? COLOR_BLACK : COLOR_WHITE};
      transform-origin: 50% 50%;
      content: '';
      z-index: 1;
    }
    
    &:before {
      transform: rotate(45deg);
    }
    
    &:after {
      transform: rotate(-45deg);
    }
  `}
`;

export const $Piece = styled.div<{
  pieceColor: Color;
  isRisen: boolean;
  isMandatory?: boolean;
  isQueen?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${(props) => (props.pieceColor === 'white' ? COLOR_WHITE : COLOR_BLACK)};
  box-sizing: border-box;
  border: 4px solid ${(props) => (props.isMandatory ? COLOR_ACCENT : COLOR_BLACK)};
  
  &:before,
  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: block;
    border-radius: 50%;
    border: 2px solid ${(props) => (props.pieceColor === 'white' ? COLOR_BLACK : COLOR_WHITE)};
    content: '';
  }
  
  &:before {
    width: 70%;
    height: 70%;
    ${(props) => props.isQueen && css`
      border: 2px solid ${COLOR_ACCENT};
    `}
  }
  
  &:after {
    width: 40%;
    height: 40%;
    ${(props) => props.isQueen && css`
      font-weight: bold;
      border: 2px solid ${COLOR_ACCENT};
      color: ${COLOR_ACCENT};
      content: 'Q';
    `}
  }
`;

export const $Shadow = styled.div<{ isVisible: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  top: 2px;
  left: 2px;
  
  ${getDottedPattern()};
`;
