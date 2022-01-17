import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
 

const styles = StyleSheet.create({
    container: {
        // paddingVertical: Constants.statusBarHeight,
        backgroundColor: "#24292e",
        height: 100,
        alignItems: "flex-end",
        paddingHorizontal: 20,
        flexDirection:"row"
        // ...
    },
    tabStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        paddingBottom: 20
    }
    // ...
});

const AppBar = () => {
    return <View style={styles.container}>
        <Pressable style={{ }} >
            <Text style={styles.tabStyle} >Respositories</Text>
        </Pressable>
    </View>;
};

export default AppBar;
