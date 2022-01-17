import React from 'react';
import { Image, Platform, Pressable, StyleSheet,   View } from 'react-native';
import MyText from '../Text';
import theme from '../theme';
import * as Linking from 'expo-linking';
import { useHistory } from 'react-router-native';
const Repositoryitem = (props) => {
    const history = useHistory();
    const intToString = (num) => {
        num = num.toString().replace(/[^0-9.]/g, '');
        if (num < 1000) {
            return num;
        }
        let si = [
            { v: 1E3, s: "K" },
            { v: 1E6, s: "M" },
            { v: 1E9, s: "B" },
            { v: 1E12, s: "T" },
            { v: 1E15, s: "P" },
            { v: 1E18, s: "E" }
        ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
    };
    
    return (
        <Pressable onPress={() =>  history.push("/SingleRepositoryView", {repoId: props.item.id})} style={{padding: 10}} >
            <View style={{ flexDirection: "row" }} >
                <Image style={{ width: 50, height: 50, borderRadius: 4 }} source={{ uri: props.item.ownerAvatarUrl }} />
                <View style={{ marginLeft: 20 }} >
                    <MyText style={{ fontSize: 18, fontWeight: Platform.OS === "ios" ? "bold" : "600", color: theme.colors.textPrimary }} >{props.item.fullName}</MyText>
                    <MyText style={{ fontSize: 16, color: theme.colors.textSecondary, marginVertical: 5 }} >{props.item.description}</MyText>
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ backgroundColor: "#0366d6", padding: 5, borderRadius: 4 }} >
                            <MyText style={{ color: "white" }} >{props.item.language}</MyText>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 10 }} >
                <View style={{ alignItems: "center" }} >
                    <MyText style={styles.upText} >{intToString(props.item.stargazersCount)}</MyText>
                    <MyText style={styles.bottomText} >Stars</MyText>
                </View>
                <View style={{ alignItems: "center" }} >
                    <MyText style={styles.upText}>{intToString(props.item.forksCount)}</MyText>
                    <MyText style={styles.bottomText}>Forks</MyText>
                </View>
                <View style={{ alignItems: "center" }} >
                    <MyText style={styles.upText}>{props.item.reviewCount}</MyText>
                    <MyText style={styles.bottomText}>Reviews</MyText>
                </View>
                <View style={{ alignItems: "center" }} >
                    <MyText style={styles.upText}>{props.item.ratingAverage}</MyText>
                    <MyText style={styles.bottomText}>Rating</MyText>
                </View>
            </View>
           
        </Pressable>
    );
};
const styles = StyleSheet.create({
    upText: {
        fontWeight: Platform.OS === "ios" ? "bold" : "600", fontSize: 14
    },
    bottomText: {
        color: theme.colors.textSecondary
    }
});

export default Repositoryitem;
