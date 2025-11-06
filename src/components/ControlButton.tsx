import React from "react";
import { Pressable, Text} from "react-native";
import { styles } from "../styles/FlexStyles";

interface ControlButtonProps{
    label:string
    onPress:() => void
}

export const ControlButton: React.FC<ControlButtonProps> = ({label,onPress}) =>{
return(
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
)
}