import React, { useState } from 'react';
import { Alert, Pressable, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  task:string[]
  setTask:React.Dispatch<React.SetStateAction<string[]>>
  isDisabled:boolean
  setIsDisabled:React.Dispatch<React.SetStateAction<boolean>>
}

function ButtonAddItem({task, setTask, isDisabled, setIsDisabled}:Props) {
  const tugas = ['makan', 'tidur', 'mandi', 'ngoding'];
  const [index, setIndex] = useState<number>(0);
  const {theme} = useTheme()

  const onAdd = (): void => {
    setTask(prev => [...prev, tugas[index]]);
    setIndex(prev => (prev + 1) % tugas.length);
  };

  const oneCLick = (): void => {
    setIsDisabled(true);
    Alert.alert('Sudah diklik!');
  };

  return (
    <View style={[styles.container,{backgroundColor:theme ? '#fff' : '#222'}]}>
      <Pressable
        onPress={oneCLick}
        disabled={isDisabled}
        style={[
          styles.button,
          { backgroundColor: isDisabled ? '#aaa' : '#007BFF' },
        ]}
      >
        <Text style={styles.buttonText}>
          {isDisabled ? 'Sudah Diklik' : 'One Click'}
        </Text>
      </Pressable>

      <Pressable onPress={onAdd} style={[styles.button, { backgroundColor: '#28a745' }]}>
        <Text style={styles.buttonText}>Tambah Aktivitas</Text>
      </Pressable>

      <View style={styles.list}>
        {task.map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default ButtonAddItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 8,
    width: '75%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    marginTop: 25,
    width: '85%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    alignItems:"center"
  },
});
