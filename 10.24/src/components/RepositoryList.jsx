import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { Component, useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, Text, TextInput, Button, Platform, ActivityIndicator } from 'react-native';
import { GET_ALL_REPOSITORIES, GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';
import MyText from '../Text';
import theme from '../theme';
import Repositoryitem from './RepositoryItem';
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from "react-native-raw-bottom-sheet";
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
    const [repositoryData, setRepositoryData] = useState([]);
    const [searchedRepository, setSearchRepository] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    const { data, error, loading } = useQuery(GET_ALL_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    const searchDataa = useQuery(SEARCH_REPO, {
        variables: { searchKeyword: searchValue },
        fetchPolicy: 'cache-and-network',
    })

    if (loading) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
        <ActivityIndicator />
    </View>;
    if (error) return console.log(`Error! ${error}`);
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

    // const searchData = (text) => {
    //     console.log(searchDataa.data);
    //     setSearchValue(text);

    //     let res = repositoryNodes;
    //     let ress = res.filter(f => f.fullName.includes(text));
    //     // console.log(ress);

    // };



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






// import { useQuery } from '@apollo/client';
// import moment from 'moment';
// import React, { useEffect, useRef, useState } from 'react';
// import { FlatList, View, StyleSheet, Text, TextInput, Button, Platform } from 'react-native';
// import { GET_ALL_REPOSITORIES, GET_REPOSITORIES } from '../graphql/queries';
// import useRepositories from '../hooks/useRepositories';
// import MyText from '../Text';
// import theme from '../theme';
// import Repositoryitem from './RepositoryItem';
// // import { Picker } from '@react-native-picker/picker';
// import RNPickerSelect from 'react-native-picker-select';
// import RBSheet from "react-native-raw-bottom-sheet";
// import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';

// const styles = StyleSheet.create({
//     separator: {
//         height: 10,
//         backgroundColor: "#CCCCCC"
//     },
// });


// const ItemSeparator = () => <View style={styles.separator} />;
// const _renderRepositories = ({ item, index }) => {
//     return (
//         <Repositoryitem
//             item={item}
//             index={index}
//         />
//     );
// };

// const RepositoryList = () => {
//     const refRBSheet = useRef();
//     const [selectedLanguage, setSelectedLanguage] = useState("Latest repositories");
//     const [repositoryData, setRepositoryData] = useState([]);
//     const [searchValue, setSearchValue] = useState("");

//     const { data } = useQuery(GET_ALL_REPOSITORIES, {
//         fetchPolicy: 'cache-and-network',
//     });


//     let repositoryNodes = data?.repositories?.edges.map((item) =>
//         item.node
//     );



//     const _returnKey = (item, index) => {
//         return item + index;
//     };
//     useEffect(() => {

//     }, []);
//     // if (selectedLanguage === "Latest repositories") {
//     //     let res = repositoryNodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     //     repositoryNodes = res;
//     // }
//     // else if (selectedLanguage === "Heighest rated repositories") {
//     //     repositoryNodes = repositoryNodes;
//     // }
//     // else {
//     //     repositoryNodes.reverse();
//     // }
//     const changeData = (itemValue) => {

//     };
//     const searchData = (e) => { 
//         setSearchValue(e);
//         console.log(searchValue) 
//     };
//     return (
//         <View style={{ flex: 1 }} >

//             <View style={{ padding: 10, backgroundColor: "#CCCCCC" }} >
//                 <View style={{
//                     flexDirection: "row", alignItems: "center", height: 50,
//                     backgroundColor: "white", paddingHorizontal: 10
//                 }} >
//                     <Ionicons name="search" size={24} color="black" />
//                     <View style={{ flex: 1, paddingHorizontal: 10, height: "100%" }} >
//                         <TextInput value={searchValue} onChange={e => searchData(e)} placeholder='filter by name' style={{ height: "100%" }} />
//                     </View>
//                     <Entypo name="cross" size={24} color="black" />
//                 </View>


//                 <RNPickerSelect
//                     onValueChange={(itemValue) => {
//                         itemValue &&
//                             setSelectedLanguage(itemValue); changeData(itemValue)
//                     }

//                     }
//                     items={[
//                         { label: 'Latest repositories', value: 'Latest repositories' },
//                         { label: 'Heighest rated repositories', value: 'Heighest rated repositories' },
//                         { label: 'Lowest rated repositories', value: 'Lowest rated repositories' },
//                     ]}
//                 >
//                     <View style={{ backgroundColor: "#CCCCCC", height: 40, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }} >
//                         <MyText>{selectedLanguage}</MyText>
//                         <AntDesign name="caretdown" size={12} color="black" />
//                     </View>
//                 </RNPickerSelect>


//             </View>
//             <FlatList
//                 data={repositoryNodes}
//                 ItemSeparatorComponent={ItemSeparator}
//                 keyExtractor={_returnKey}
//                 renderItem={_renderRepositories}
//             />

//         </View>

//     );
// };

// export default RepositoryList;
