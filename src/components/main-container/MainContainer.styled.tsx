import styled from 'styled-components';
import { BOARD_SIZE_PX, COLOR_BLACK, COLOR_WHITE } from '../../common.styled';

export const $MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: ${BOARD_SIZE_PX}px;
  text-align: center;
`;

export const $MainHeader = styled.h1`
  margin: 10px;
  padding: 20px 28px;
  font-size: 48px;
  color: ${COLOR_BLACK};
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 ${COLOR_WHITE};
`;
