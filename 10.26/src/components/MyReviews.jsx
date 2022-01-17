import { useQuery } from '@apollo/client';
import moment from 'moment';
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { AUTHORIZED_USER } from '../graphql/queries';
import MyText from '../Text';
import theme from '../theme';

export default function MyReviews() {
    let { data, loading, error } = useQuery(AUTHORIZED_USER, {
        variables:{includeReviews: true}
    });
    if (loading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator />
    </View>;
    if (error) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
         <Text>{error.message}</Text>
    </View>;

    const _renderReviews = ({ item, index }) => {
        return (
            <View key={index} style={{ width: "100%", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 15 }} >
    
                <View style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: theme.colors.primary, justifyContent: "center", alignItems: 'center' }} >
                    <MyText style={{ color: theme.colors.primary, fontWeight: "bold", fontSize: 18 }} >{item.node.rating}</MyText>
                </View>
                <View style={{ flex: 1, paddingLeft: 10 }} >
                    <MyText style={{ fontWeight: "bold" }}>{item.node.user.username}</MyText>
                    <MyText style={{ color: theme.colors.textSecondary, marginTop: 5 }} >{moment(item.node.createdAt).format("DD.MM.YYYY")}</MyText>
                    <MyText style={{ lineHeight: 20, marginTop: 10 }} >{item.node.text}</MyText>
                </View>
    
            </View>
        );
    };
    const _returnKey = (item, index) => {
        return item + index;
    };

    const ItemSeparator = () => <View style={styles.separator} />;
    return (
       <View>
            <FlatList
                data={data.authorizedUser.reviews.edges}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={_returnKey}
                renderItem={_renderReviews}
            />
       </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: "#CCCCCC"
    },
});
