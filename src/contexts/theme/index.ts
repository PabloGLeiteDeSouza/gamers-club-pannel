import React from "react";

export const ThemeContext = React.createContext({
    theme: 'light',
    setTheme: (theme: string) => {theme},
    toggleTheme: () => {}
})