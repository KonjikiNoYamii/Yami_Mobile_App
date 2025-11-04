import React, { createContext, useContext, useState } from "react"

interface ThemeTypeContext {
  theme:boolean
  changeTheme:() => void
}

interface Props{
  children:React.ReactNode
}

const ThemeContext = createContext<ThemeTypeContext|undefined>(undefined)

export const ThemeProvider = ({children}:Props) =>{
  const [theme, setTheme] = useState<boolean>(true)

  const changeTheme = ():void =>{
    setTheme(prev => !prev)

  }
  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = ():ThemeTypeContext =>{
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme harus digunakan dalam provider")
  }
      return context 

}
