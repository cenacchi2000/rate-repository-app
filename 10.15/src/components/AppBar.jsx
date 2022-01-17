import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import MyText from '../Text';
import useAuthStorage from '../utils/useAuthStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApolloClient } from '@apollo/client';
import AuthStorage from '../utils/authStorage';



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
    const client = useApolloClient();
    const [token, setToken] = useState(null);
    const authStorage = useAuthStorage();
    const getAccess = async () => {
        let res = await authStorage.getAccessToken();
        setToken(res);
    };
    useEffect(() => {
        getAccess(); 
    }, [authStorage.getAccessToken()]);

    const signOut = () => {
        AsyncStorage.clear();
        client.resetStore();
    };
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} >
                <Link to={'/'} style={{}} >
                    <MyText style={styles.tabStyle} >Respositories</MyText>
                </Link>
                {
                    token ?
                        <Pressable onPress={() => signOut()} style={{ marginHorizontal: 10 }} >
                            <MyText style={styles.tabStyle} >Sign out</MyText>
                        </Pressable>
                        :
                        <Link style={{ marginHorizontal: 10 }} to={'/SignIn'}>
                            <MyText style={styles.tabStyle} >Sign in</MyText>
                        </Link>
                }

            </ScrollView>
        </View>
    );
};

export default AppBar;
