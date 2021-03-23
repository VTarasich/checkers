import React from 'react';

import MenuButton from '../menu-button/MenuButton';

import $Container from './BoardMenu.styled';

interface MenuButtonProps {
  onUndo: () => void;
  onStartNewGame: () => void;
}

const BoardMenu: React.FC<MenuButtonProps> = ({ onUndo, onStartNewGame }) => (
  <$Container>
    <MenuButton label="Undo" onClick={onUndo} />
    <MenuButton label="New game" onClick={onStartNewGame} />
  </$Container>
);

export default BoardMenu;
