import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import MyText from '../Text';
import useAuthStorage from '../utils/useAuthStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApolloClient, useQuery } from '@apollo/client';
import AuthStorage from '../utils/authStorage';
import { AUTHORIZED_USER } from '../graphql/queries';
import { useHistory } from 'react-router-native';



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
    let { data, loading, error } = useQuery(AUTHORIZED_USER, {
        variables:{includeReviews: true}
    });
    const client = useApolloClient();
    const [token, setToken] = useState(null);
    const authStorage = useAuthStorage();
    const history = useHistory();
    const getAccess = async () => {

        console.log(JSON.stringify(data), "resssssss")
        let res = await authStorage.getAccessToken();
        setToken(res);
    };
    useEffect(() => {

        getAccess();
    }, [authStorage.getAccessToken()]);

    const signOut = () => {
        AsyncStorage.clear();
        client.resetStore();
        history.push("/");
    };
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} >
                <Link to={'/'} style={{}} >
                    <MyText style={styles.tabStyle} >Respositories</MyText>
                </Link>
                {
                    token ?
                        <Link to={"/CreateReview"} style={{ marginHorizontal: 10 }} >
                            <MyText style={styles.tabStyle} >Create a review</MyText>
                        </Link>
                        :
                        null
                }

                <Link to={"/MyReviews"} style={{ marginHorizontal: 10 }} >
                    <MyText style={styles.tabStyle} >My review</MyText>
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
                {
                    !token ?
                        <Link style={{ marginHorizontal: 10 }} to={'/SignUp'}>
                            <MyText style={styles.tabStyle} >Sign up</MyText>
                        </Link>
                        :
                        null
                }


            </ScrollView>
        </View>
    );
};

export default AppBar;
