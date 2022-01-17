import { useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, Platform } from 'react-native';
import { useLocation } from 'react-router-native';
import { GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';
import MyText from '../Text';
import theme from '../theme';
import Repositoryitem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: "#CCCCCC"
    },
});




const ItemSeparator = () => <View style={styles.separator} />;
const _renderReviews = ({ item, index }) => {
    return (
        <View key={index} style={{ width: "100%", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 15 }} >

            <View style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: theme.colors.primary, justifyContent: "center", alignItems: 'center' }} >
                <MyText style={{ color: theme.colors.primary, fontWeight: Platform.OS === "ios" ? "bold" : "600", fontSize: 18 }} >{item.node.rating}</MyText>
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }} >
                <MyText style={{ fontWeight: Platform.OS === "ios" ? "bold" : "600" }}>{item.node.user.username}</MyText>
                <MyText style={{ color: theme.colors.textSecondary, marginTop: 5 }} >{moment(item.node.createdAt).format("DD.MM.YYYY")}</MyText>
                <MyText style={{ lineHeight: 20, marginTop: 10 }} >{item.node.text}</MyText>
            </View>

        </View>
    );
};

const SingleRepositoryView = () => {
    const location = useLocation();
    const repoId = location.state.repoId; 
    const { loading, error, data } = useQuery(GET_REPOSITORIES, {
        variables: { id: repoId },
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;
    const _returnKey = (item, index) => {
        return item + index;
    };
   
    return (
        <View style={{ flex: 1, }} >

            <Repositoryitem
                item={data.repository}
            />



            <View style={styles.separator} />
            <FlatList
                data={data.repository.reviews.edges}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={_returnKey}
                renderItem={_renderReviews}
            />

        </View>

    );
};

export default SingleRepositoryView;
