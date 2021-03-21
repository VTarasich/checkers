import React from 'react';

import $Button from './MenuButton.styled';

interface MenuButtonProps {
  label: string;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, onClick }) => (
  <$Button type="button" onClick={onClick}>{label}</$Button>
);

export default MenuButton;
