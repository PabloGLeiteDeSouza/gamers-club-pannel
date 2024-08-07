import { ThemeContext } from "@contexts/theme";
import React from "react";
import { IThemeProviderProps } from "./interfaces";

const ThemeProvider: React.FC<IThemeProviderProps> = ({children, defautltTheme, documentAtrkibutekey, storageKey, LoadingComponent}) => {
    
    const st_key = storageKey ? storageKey : "theme";

    const dc_key = documentAtrkibutekey ? documentAtrkibutekey : "data-theme";

    const [theme, changeTheme] = React.useState(defautltTheme ? defautltTheme : "light");
    const [isLoading, setIsLoading] = React.useState(true);

    const setTheme = React.useCallback((theme: string) => {
        localStorage.setItem(st_key, theme);
        document.documentElement.setAttribute(dc_key, theme);
        changeTheme(theme);
    },[dc_key, st_key])

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    React.useEffect(() => {
        const storedTheme = localStorage.getItem(st_key);
        const documentTheme = document.documentElement.getAttribute(dc_key);
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (defautltTheme) {
            setTheme(defautltTheme);
        } else if (documentTheme) {
            setTheme(documentTheme);
        } else {
            setTheme("light");
        }
        setIsLoading(false);
    },[dc_key, defautltTheme, setTheme, st_key])
    
    if (isLoading) {
        return LoadingComponent ? <LoadingComponent/> : (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-6">
                        <span className="animate-pulse">C</span>
                        <span className="animate-pulse">a</span>
                        <span className="animate-pulse">r</span>
                        <span className="animate-pulse">r</span>
                        <span className="animate-pulse">e</span>
                        <span className="animate-pulse">g</span>
                        <span className="animate-pulse">a</span>
                        <span className="animate-pulse">n</span>
                        <span className="animate-pulse">d</span>
                        <span className="animate-pulse">o</span>
                        <span className="animate-pulse">...</span>
                    </h1>
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{setTheme, theme, toggleTheme}} >
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeProvider;