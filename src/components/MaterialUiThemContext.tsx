import { createMuiTheme } from '@material-ui/core';
import React from 'react';

export const darkTheme = createMuiTheme({
    palette: {
      type: "dark"
    }
})

export const lightTheme = createMuiTheme({
    palette: {
      type: "light"
    }
})

const MuiThemeContext = React.createContext({theme:darkTheme, toggleTheme: () => {
    
}});

export default MuiThemeContext;

