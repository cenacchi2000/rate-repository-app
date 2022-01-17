import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignIn() {
  return (
    <View style={{ paddingHorizontal: 20 }} >
      <View style={styles.textInputStyle} >
        <TextInput style={{ height: "100%" }} placeholder='Username' />
      </View>
      <View style={styles.textInputStyle} >
        <TextInput style={{ height: "100%" }} placeholder='Password' />
      </View>
      <Pressable style={styles.buttonStyle} >
        <Text style={{ color: "white", fontSize: 18 }}>Sign in</Text>
      </Pressable>



    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: "100%", height: 50, borderWidth: 1, paddingHorizontal: 10, marginTop: 20, borderRadius: 4
  },
  buttonStyle: {
    backgroundColor: "#0366d6", height: 50,
    justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 4
  }
})
