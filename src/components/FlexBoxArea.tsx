import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles/FlexStyles'

interface FlexBoxAreaProps{
    flexDirection:'row'|'column'|"row-reverse"
    justifyContent:'flex-start'|'center'|'space-between'
    alignItems:'flex-start'|'center'|'stretch'
}

export const FlexBoxArea : React.FC<FlexBoxAreaProps> = ({
    flexDirection,justifyContent,alignItems
}) => {
  return (
    <View style={[
        (styles as any).flexContainer,
        (styles as any)[`flexDirection_${flexDirection}`],
        (styles as any)[`justify_${justifyContent.replace('-','_')}`],
        (styles as any)[`align_${alignItems.replace('-','_')}`]
    ]}>
        <View style={[styles.box, styles.redBox]}/>
        <View style={[styles.box, styles.blueBox]}/>
        <View style={[styles.box, styles.greenBox]}/>
    </View>
  )
}

