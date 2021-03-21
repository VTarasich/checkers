import styled, { css } from 'styled-components';
import {
  BOARD_SIZE_PX, COLOR_ACCENT, COLOR_BLACK, COLOR_MAIN, COLOR_WHITE,
} from '../../common.styled';

export const $Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${BOARD_SIZE_PX}px;
  height: ${BOARD_SIZE_PX}px;
  border: 6px solid ${COLOR_ACCENT};
  border-radius: 10px;
  background: #ffece4;
  box-shadow: 10px 10px ${COLOR_BLACK};
  overflow: hidden;
`;

export const $PlayerName = styled.div<{ isActive: boolean; position: 'top' | 'bottom' }>`
  display: flex;
  flex-wrap: wrap;
  
  background: ${(props) => (props.isActive ? COLOR_WHITE : COLOR_MAIN)};
  border: 6px solid ${COLOR_ACCENT};
  border-radius: ${(props) => (
    props.position === 'top' ? '10px 10px 0 0 ' : '0 0 10px 10px'
  )};
  box-shadow: 10px 10px ${COLOR_BLACK};
      padding: 10px 50px;
    letter-spacing: 4px;
    font-weight: bold;
  
  ${(props) => (props.position === 'top'
    ? css`border-bottom: none;` : css`border-top: none;`)};
`;
