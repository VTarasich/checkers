import styled from 'styled-components';

import { COLOR_BLACK, COLOR_WHITE } from '../../common.styled';

const ACTION_OFFSET_PX = 2;
const SHADOW_SIZE_PX = 4;

const $Button = styled.button`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 22px;
    padding: 10px 22px;
    border: 2px solid ${COLOR_BLACK};
    border-radius: 6px;
    background: ${COLOR_WHITE};
    box-shadow: ${SHADOW_SIZE_PX}px ${SHADOW_SIZE_PX}px ${COLOR_BLACK};
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;
    white-space: nowrap;
    
    &:hover {
      transform: translate(-${ACTION_OFFSET_PX}px, -${ACTION_OFFSET_PX}px);
      box-shadow: ${SHADOW_SIZE_PX + ACTION_OFFSET_PX}px ${SHADOW_SIZE_PX + ACTION_OFFSET_PX}px black;
    }
    
    &:active {
      transform: translate(${ACTION_OFFSET_PX}px, ${ACTION_OFFSET_PX}px);
      box-shadow: 0 0 black;
    }
`;

export default $Button;
