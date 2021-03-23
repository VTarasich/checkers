import React from 'react';

import MenuButton from '../menu-button/MenuButton';
import { PlayerType } from '../../types';

import { $WinnerContainer, $Title } from './Winner.styled';

interface MenuButtonProps {
  winner: PlayerType | null;
  onStartNewGame: () => void;
}

const Winner: React.FC<MenuButtonProps> = ({ winner, onStartNewGame }) => (
  winner
    ? (
      <$WinnerContainer>
        <$Title>
          {`${winner} player wins!`}
        </$Title>
        <MenuButton label="New game" onClick={onStartNewGame} />
      </$WinnerContainer>
    )
    : null
);

export default Winner;
