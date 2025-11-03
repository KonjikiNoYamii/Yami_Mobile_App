import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Modal, Button, StyleSheet } from 'react-native';

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.switchBox}>
        <Text>Ingat Saya</Text>
        <Switch value={remember} onValueChange={setRemember} />
      </View>

      <Button title="Submit" onPress={() => setVisible(true)} />

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <Text style={{ marginBottom: 10 }}>Login Berhasil!</Text>
          <Button title="Tutup" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 10, borderRadius: 5 },
  switchBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  modalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
});
