import React from 'react'
import { Button } from 'react-native'
import { useTheme } from '../hooks/useTheme'

function ButtonTheme() {
    const {theme, changeTheme} = useTheme()
  return (
    <Button title={`${theme ?"dark":"light"}`} onPress={changeTheme}/>
  )
}

export default ButtonTheme