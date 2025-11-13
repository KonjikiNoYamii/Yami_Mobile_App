import React, { Children, createContext, ReactNode, useContext, useState } from "react"

interface ThemeContextProps{
    isDark:boolean
    toggleTheme:() => void
}

const ThemeContext = createContext<ThemeContextProps>({
    isDark:false,
    toggleTheme:() => {}
})
interface ThemeProviderProps{
    children:ReactNode
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [isDark, setIsDark] = useState(false)

    const toggleTheme = () => {
        setIsDark(prev => !prev)
    }
    return(
        <ThemeContext.Provider value={{isDark,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () =>{
    const context = useContext(ThemeContext)
    return context
}