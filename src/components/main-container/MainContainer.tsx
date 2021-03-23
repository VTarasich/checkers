import React from 'react';
import { useSelector } from 'react-redux';

import { selectGameMode } from '../../store/game/selectors';
import DummyAI from '../ai/DummyAI';

import MainContainerContent from './MainContainerContent';

import { $MainContainer, $MainHeader } from './MainContainer.styled';

const MainContainer: React.FC = () => {
  const currentGameMode = useSelector(selectGameMode);

  return (
    <$MainContainer>
      <$MainHeader>
        CHECKERS
      </$MainHeader>
      <MainContainerContent />
      {currentGameMode === 'AI' && <DummyAI />}
    </$MainContainer>
  );
};

export default MainContainer;
