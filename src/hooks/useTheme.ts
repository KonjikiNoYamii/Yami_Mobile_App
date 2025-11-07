import { useState } from "react"
import { StyleSheet } from "react-native"

export const useTheme= () =>{
    const [isDark, setIsDark] = useState(true)

    const theme = {
        background: isDark? "#000":"#fff",
        text:isDark? "#fff":"#000",
        card:isDark? '#111' : '#f4f4f4'
    }

    const styles = StyleSheet.create({
            container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 10,
    },
    text: {
      color: theme.text,
    },
  });

  return { isDark, setIsDark, theme, styles };
}