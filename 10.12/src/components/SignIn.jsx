import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet,  TextInput, View } from 'react-native'; 
import MyText from '../Text';

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [userNameBorderColor, setUserNameBorderColor] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState(null);
  const onsubmit = () => {
    if (!userName) {
      setUserNameBorderColor(true);
    }
    else if (!password) {
      setPasswordBorderColor(true);
    }
  };
  return (
    <View style={{ paddingHorizontal: 20 }} >
      <View style={[styles.textInputStyle, { borderColor: userNameBorderColor ? "#d73a4a" : "#CCCCCC" }]} >
        <TextInput value={userName} onChangeText={e => { setUserName(e); setUserNameBorderColor(null); }} style={styles.textStyle} placeholder='Username' />
      </View>
      {
        userNameBorderColor &&
        <MyText style={{ color: userNameBorderColor ? "#d73a4a" : "#CCCCCC", marginTop: 5 }} >Username is required</MyText>
      }

      <View style={[styles.textInputStyle, { borderColor: passwordBorderColor ? "#d73a4a" : "#CCCCCC" }]} >
        <TextInput value={password} onChangeText={e => { setPassword(e); setPasswordBorderColor(null); }} style={styles.textStyle} placeholder='Password' />
      </View>
      {
        passwordBorderColor &&
        <MyText style={{ color: passwordBorderColor ? "#d73a4a" : "#CCCCCC", marginTop: 5 }} >Password is required</MyText>
      }

      <Pressable onPress={() => onsubmit()} style={styles.buttonStyle} >
        <MyText style={{ color: "white", fontSize: 18, fontFamily: "Arial" }}>Sign in</MyText>
      </Pressable>



    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: "100%", height: 50, borderWidth: 1, borderColor: "#CCCCCC", paddingHorizontal: 10, marginTop: 20, borderRadius: 4
  },
  buttonStyle: {
    backgroundColor: "#0366d6", height: 50,
    justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 4
  },
  textStyle: {
    height: "100%",
    color: Platform.select({
      android: 'green',
      ios: 'blue',
      default: 'black',
    }),

  }
});
