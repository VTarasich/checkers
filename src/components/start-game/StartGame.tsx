import React from 'react';

import MenuButton from '../menu-button/MenuButton';
import { GameMode } from '../../types';

import { $Title, $StartGameContainer } from './StartGame.styled';

interface StartGameProps {
  onModeSelect: (mode: GameMode) => void;
}

const StartGame: React.FC<StartGameProps> = ({ onModeSelect }) => {
  const onPvPChosen = () => onModeSelect('PvP');
  const onAIChosen = () => onModeSelect('AI');

  return (
    <$StartGameContainer>
      <$Title>New game</$Title>
      <MenuButton label="Player vs Player" onClick={onPvPChosen} />
      <MenuButton label="Player vs 'AI'" onClick={onAIChosen} />
    </$StartGameContainer>
  );
};

export default StartGame;
