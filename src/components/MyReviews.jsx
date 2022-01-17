import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import React, {   } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { AUTHORIZED_USER } from '../graphql/queries';
import MyText from '../Text';
import theme from '../theme';

export default function MyReviews() {
    const history = useHistory();
    const [deleteReview] = useMutation(DELETE_REVIEW);
    let { data, loading, error, refetch } = useQuery(AUTHORIZED_USER, {

    });
    history.listen(() => {
        refetch();
    });
    if (loading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator />
    </View>;
    if (error) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <Text>{error.message}</Text>
    </View>; 


    const onDelete = (id) => {
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [

                {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "DELETE", onPress: () => deleteRevieww(id), style: "destructive" }
            ]
        );
    };
    const deleteRevieww = (id) => {
        deleteReview({ variables: { id: id } })
            .then(() => {

                refetch();
            })
            .catch(error => alert(error.message));
    };

    const _renderReviews = ({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 10, }} >
                <View key={index} style={{ width: "100%", flexDirection: "row", paddingVertical: 15 }} >

                    <View style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: theme.colors.primary, justifyContent: "center", alignItems: 'center' }} >
                        <MyText style={{ color: theme.colors.primary, fontWeight: Platform.OS === "ios" ? "bold" : "600", fontSize: 18 }} >{item.node.rating}</MyText>
                    </View>
                    <View style={{ flex: 1, paddingLeft: 10 }} >
                        <MyText style={{ fontWeight: Platform.OS === "ios" ? "bold" : "600" }}>{item.node.user.username}</MyText>
                        <MyText style={{ color: theme.colors.textSecondary, marginTop: 5 }} >{moment(item.node.createdAt).format("DD.MM.YYYY")}</MyText>
                        <MyText style={{ lineHeight: 20, marginTop: 10 }} >{item.node.text}</MyText>
                    </View>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    <Pressable onPress={() =>  history.push("/SingleRepositoryView", {repoId: item.node.repositoryId})} style={{ width: "45%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.primary, borderRadius: 4 }} >
                        <MyText style={{ color: "white", fontWeight: Platform.OS === "ios" ? "bold" : "600" }} >View repository</MyText>
                    </Pressable>
                    <Pressable onPress={() => onDelete(item.node.id)} style={{ width: "45%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#d73a4a", borderRadius: 4 }} >
                        <MyText style={{ color: "white", fontWeight: Platform.OS === "ios" ? "bold" : "600" }}>Delete review</MyText>
                    </Pressable>
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
