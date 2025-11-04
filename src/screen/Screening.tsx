import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useTheme } from '../hooks/useTheme'
import ButtonAddItem from '../components/PressableButton'
import TouchableOpacityButton from '../components/TouchableOpacityButton'
import TouchableAnimated from '../components/TouchableAnimated'

const Screening = () => {
  const { theme } = useTheme()
    const [refreshing, setRefreshing] = useState(false);
  const [task, setTask] = useState<string[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);
  

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setTask([]); // reset ke default
      setRefreshing(false);
      setIsDisabled(false)
    }, 1000);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme ? '#fff' : '#222' }]}>
      <Navbar />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
      <TouchableAnimated />
      <TouchableOpacityButton />
        <ButtonAddItem task={task} setTask={setTask} isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // penting! agar View memenuhi seluruh layar
  },
})

export default Screening
