import React from 'react';

export const themes = {
    dark:{
        color:"white",
        background:"#424242"
    },
    light:{
        color:"black",
        background:"white"
    }
}



const ThemeContext = React.createContext({theme:themes.light, toggleTheme: () => {
    
}});

export default ThemeContext;