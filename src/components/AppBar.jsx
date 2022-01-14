import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import MyText from '../Text';


const styles = StyleSheet.create({
    container: {
        // paddingVertical: Constants.statusBarHeight,
        backgroundColor: "#24292e",
        height: 100,
        alignItems: "flex-end",
        paddingHorizontal: 20,
        flexDirection: "row"
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
        <ScrollView horizontal={true} >
            <Pressable style={{}} >
                <MyText style={styles.tabStyle} >Respositories</MyText>
            </Pressable>
            <Link style={{ marginHorizontal: 10 }} to={'/SignIn'}>
                <MyText style={styles.tabStyle} >Sign in</MyText>
            </Link>
        </ScrollView>
    </View>;
};

export default AppBar;
