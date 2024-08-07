"use client"
import ThemeProvider from "@/providers/theme";
import { SessionProvider } from "next-auth/react"

interface IAppProps {
    children: React.ReactNode;
}

const App: React.FC<IAppProps> = ({children}) => {


    return (
        <SessionProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}

export default App;