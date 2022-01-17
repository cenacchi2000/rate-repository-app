import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
const Repositoryitem = (props) => {
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
        <View style={{padding: 10}} >
            <View style={{ flexDirection: "row" }} >
                <Image style={{ width: 50, height: 50, borderRadius: 4 }} source={{ uri: props.item.ownerAvatarUrl }} />
                <View style={{ marginLeft: 20 }} >
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.textPrimary }} >{props.item.fullName}</Text>
                    <Text style={{ fontSize: 16, color: theme.colors.textSecondary, marginVertical: 5 }} >{props.item.description}</Text>
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ backgroundColor: "#0366d6", padding: 5, borderRadius: 4 }} >
                            <Text style={{ color: "white" }} >{props.item.language}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 10 }} >
                <View style={{ alignItems: "center" }} >
                    <Text style={styles.upText} >{intToString(props.item.stargazersCount)}</Text>
                    <Text style={styles.bottomText} >Stars</Text>
                </View>
                <View style={{ alignItems: "center" }} >
                    <Text style={styles.upText}>{intToString(props.item.forksCount)}</Text>
                    <Text style={styles.bottomText}>Forks</Text>
                </View>
                <View style={{ alignItems: "center" }} >
                    <Text style={styles.upText}>{props.item.reviewCount}</Text>
                    <Text style={styles.bottomText}>Reviews</Text>
                </View>
                <View style={{ alignItems: "center" }} >
                    <Text style={styles.upText}>{props.item.ratingAverage}</Text>
                    <Text style={styles.bottomText}>Rating</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    upText: {
        fontWeight: "bold", fontSize: 14
    },
    bottomText: {
        color: theme.colors.textSecondary
    }
});

export default Repositoryitem;
