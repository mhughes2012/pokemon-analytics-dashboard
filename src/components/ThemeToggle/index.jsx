// src/components/ThemeToggle/index.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBackground};
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadow};
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${props => props.theme.shadowHover};
    animation: ${rotate} 0.5s ease-in-out;
  }

  &:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <ToggleButton onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            {isDark ? '☀️' : '🌙'}
        </ToggleButton>
    );
};

export default ThemeToggle;