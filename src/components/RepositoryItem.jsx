import React from 'react';
import { Text, View } from 'react-native';

const Repositoryitem = (props) => {
    return (
       <View>
           <Text>Fullname: {props.item.fullName}</Text>
           <Text>Description: {props.item.description}</Text>
           <Text>Language: {props.item.language}</Text>
           <Text>Stars: {props.item.stargazersCount}</Text>
           <Text>Forks: {props.item.forksCount}</Text>
           <Text>Reviews: {props.item.reviewCount}</Text>
           <Text>Rating: {props.item.ratingAverage}</Text>
       </View>
    );
};

export default Repositoryitem;
