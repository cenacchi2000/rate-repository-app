import { useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, Text, TextInput, Button, Platform } from 'react-native';
import { GET_ALL_REPOSITORIES, GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';
import MyText from '../Text';
import theme from '../theme';
import Repositoryitem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import RBSheet from "react-native-raw-bottom-sheet";

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: "#CCCCCC"
    },
});


const ItemSeparator = () => <View style={styles.separator} />;
const _renderRepositories = ({ item, index }) => {
    return (
        <Repositoryitem
            item={item}
            index={index}
        />
    );
};

const RepositoryList = () => {
    const refRBSheet = useRef();
    const [selectedLanguage, setSelectedLanguage] = useState("latestData");
    const [repositoryData, setRepositoryData] = useState([]);

    const { data } = useQuery(GET_ALL_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });


    let repositoryNodes = data?.repositories?.edges.map((item) =>
        item.node
    );
    if (selectedLanguage === "latestData") {
        let res = repositoryNodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        repositoryNodes = res;
    }
    else if (selectedLanguage === "highRated") {
        repositoryNodes = repositoryNodes;
    }
    else {
        repositoryNodes.reverse();
    }


    const _returnKey = (item, index) => {
        return item + index;
    };


    return (
        <View style={{ flex: 1 }} >

            <View style={{ backgroundColor: "#CCCCCC" }} >


                <Picker
                    selectedValue={selectedLanguage}

                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Latest repositories" value="latestData" />
                    <Picker.Item label="Heighest rated repositories" value="highRated" />
                    <Picker.Item label="Lowest rated repositories" value="lowRated" />
                </Picker>


            </View>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={_returnKey}
                renderItem={_renderRepositories}
            />

        </View>

    );
};

export default RepositoryList;
