import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const AppContent = () => {
    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <ThemeToggle />
                <Dashboard />
            </div>
        </ThemeProvider>
    );
};

function App() {
    return (
        <CustomThemeProvider>
            <AppContent />
        </CustomThemeProvider>
    );
}

export default App;