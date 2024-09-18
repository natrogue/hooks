import React from 'react';
import { useTheme } from 'react-admin'; // React Admin's useTheme hook
import { Button } from '@mui/material'; // Material-UI's Button component

const ThemeToggler = () => {
    const [theme, setTheme] = useTheme(); // useTheme returns the current theme and a setter function

    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        </Button>
    );
}

export default ThemeToggler;