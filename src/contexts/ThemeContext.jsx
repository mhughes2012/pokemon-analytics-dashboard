// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Light and Dark theme definitions
export const lightTheme = {
    // Background colors
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.95)',
    surface: 'white',

    // Text colors
    textPrimary: '#2d3748',
    textSecondary: '#718096',
    textMuted: '#a0aec0',

    // Border colors
    border: '#e2e8f0',
    borderHover: '#667eea',

    // Status colors
    error: '#e53e3e',
    success: '#48bb78',
    warning: '#ed8936',
    info: '#4299e1',

    // Component specific
    filterBackground: 'rgba(102, 126, 234, 0.1)',
    statItemBackground: '#f7fafc',
    statItemHover: '#edf2f7',

    // Shadows
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    shadowHover: '0 10px 25px rgba(0, 0, 0, 0.15)',
};

export const darkTheme = {
    // Background colors
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    cardBackground: 'rgba(26, 32, 44, 0.95)',
    surface: '#2d3748',

    // Text colors
    textPrimary: '#f7fafc',
    textSecondary: '#cbd5e0',
    textMuted: '#a0aec0',

    // Border colors
    border: '#4a5568',
    borderHover: '#667eea',

    // Status colors
    error: '#fc8181',
    success: '#68d391',
    warning: '#f6ad55',
    info: '#63b3ed',

    // Component specific
    filterBackground: 'rgba(102, 126, 234, 0.2)',
    statItemBackground: '#4a5568',
    statItemHover: '#718096',

    // Shadows
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    shadowHover: '0 10px 25px rgba(0, 0, 0, 0.4)',
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('pokemonDashboard-darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const theme = isDark ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDark(prev => {
            const newValue = !prev;
            localStorage.setItem('pokemonDashboard-darkMode', JSON.stringify(newValue));
            return newValue;
        });
    };

    // Update body background when theme changes
    useEffect(() => {
        document.body.style.background = theme.background;
        document.body.style.minHeight = '100vh';
        document.body.style.transition = 'background 0.3s ease';
    }, [theme.background]);

    const value = {
        theme,
        isDark,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};