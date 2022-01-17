import { gql, useQuery } from '@apollo/client';

import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TextInput, ActivityIndicator, Text } from 'react-native';
import { GET_ALL_REPOSITORIES, } from '../graphql/queries';

import MyText from '../Text';

import Repositoryitem from './RepositoryItem';
import RNPickerSelect from 'react-native-picker-select';

import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';


const SEARCH_REPO = gql`
  query GetAllRepositories($searchKeyword: String)  {
    repositories (searchKeyword: $searchKeyword) {
        edges {
          node {
            id
        fullName
        createdAt
        ratingAverage
        ownerName
        ownerAvatarUrl
        forksCount
        stargazersCount
        fullName
        description
        language
        reviewCount
        ratingAverage
          }
        }
      }
  }
`;

export default function RepositoryList() {
    const [selectedLanguage, setSelectedLanguage] = useState("Latest repositories"); 
    const [searchValue, setSearchValue] = useState("");



    const { data, error, loading } = useQuery(GET_ALL_REPOSITORIES, {
        variables: {  },
        fetchPolicy: 'cache-and-network',
    });
    const searchDataa = useQuery(SEARCH_REPO, {
        variables: { searchKeyword: searchValue, },
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator />
    </View>;
    if (error) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
         <Text>{error.message}</Text>
    </View>;

    let repositoryNodes = data?.repositories?.edges.map((item) =>
        item.node
    );

    if (selectedLanguage === "Latest repositories") {
        let res = repositoryNodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        repositoryNodes = res;
    }
    else if (selectedLanguage === "Heighest rated repositories") {
        repositoryNodes;
    }
    else {
        repositoryNodes.reverse();
    }

    if (searchValue.length > 0) {
        let searched = searchDataa.data?.repositories?.edges.map((item) =>
            item.node
        );
        repositoryNodes = searched;
    }



    const ItemSeparator = () => <View style={styles.separator} />;
    const _returnKey = (item, index) => {
        return item + index;
    };
    const _renderRepositories = ({ item, index }) => {
        return (
            <Repositoryitem
                item={item}
                index={index}
            />
        );
    };

    return (
        <View style={{ flex: 1 }} >


            <View style={{ backgroundColor: "#CCCCCC", padding: 15 }} >
                <View style={{
                    flexDirection: "row", alignItems: "center", height: 50,
                    backgroundColor: "white", paddingHorizontal: 10,
                    marginBottom: 10, borderRadius: 5
                }} >
                    <Ionicons name="search" size={24} color="black" />
                    <View style={{ flex: 1, paddingHorizontal: 10, height: "100%" }} >
                        <TextInput value={searchValue} onChangeText={text => setSearchValue(text)} placeholder='filter by name' style={{ height: "100%" }} />
                    </View>
                    <Entypo onPress={() => setSearchValue("")} name="cross" size={24} color="black" />
                </View>
                < RNPickerSelect
                    onValueChange={(itemValue) => {
                        itemValue &&
                            setSelectedLanguage(itemValue);
                    }

                    }
                    items={[
                        { label: 'Latest repositories', value: 'Latest repositories' },
                        { label: 'Heighest rated repositories', value: 'Heighest rated repositories' },
                        { label: 'Lowest rated repositories', value: 'Lowest rated repositories' },
                    ]}
                >
                    <View style={{ backgroundColor: "#CCCCCC", height: 40, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }} >
                        <MyText>{selectedLanguage}</MyText>
                        <AntDesign name="caretdown" size={12} color="black" />
                    </View>
                </RNPickerSelect>
            </View>
            {
                repositoryNodes &&
                <FlatList
                    data={repositoryNodes}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={_returnKey}
                    renderItem={_renderRepositories}
                     


                />
            }



        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: "#CCCCCC"
    },
});



