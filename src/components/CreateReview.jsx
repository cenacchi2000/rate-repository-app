import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import MyText from '../Text';

export default function CreateReview() {
    const [repositoryOwnerName, setRepositoryOwnerName] = useState("");
    const [repositoryOwnerNameBorderColor, setRepositoryOwnerNameBorderColor] = useState(null);
    const [repositoryName, setRepositoryName] = useState("");
    const [repositoryNameBorderColor, setRepositoryNameBorderColor] = useState(null);
    const [rating, setRating] = useState(null);
    const [ratingBorderColor, setRatingBorderColor] = useState(null);
    const [review, setReview] = useState("");
    const [createReview] = useMutation(CREATE_REVIEW);
    let history = useHistory();

    const onsubmit = () => {
        if (!repositoryOwnerName) {
            setRepositoryOwnerNameBorderColor(true);
        }
        else if (!repositoryName) {
            setRepositoryNameBorderColor(true);
        }
        else if (!rating) {
            setRatingBorderColor(true);
        }
        else { 
            createReview({ variables: { repositoryName: repositoryOwnerName, ownerName: repositoryName, rating: parseInt(rating), text: review } })
                .then(res => {
                    if (res) {
                        history.push("/");
                    }
                })
                .catch(error => alert(error.message));
        }
    };

    return (
        <View style={{ paddingHorizontal: 20 }} >
            <View style={[styles.textInputStyle, { borderColor: repositoryOwnerNameBorderColor ? "#d73a4a" : "#CCCCCC" }]} >
                <TextInput value={repositoryOwnerName} onChangeText={e => { setRepositoryOwnerName(e); setRepositoryOwnerNameBorderColor(null); }} style={styles.textStyle} placeholder='Repository owner name' />
            </View>
            {
                repositoryOwnerNameBorderColor &&
                <MyText style={{ color: repositoryOwnerNameBorderColor ? "#d73a4a" : "#CCCCCC", marginTop: 5 }} >Repository owner name is required</MyText>
            }

            <View style={[styles.textInputStyle, { borderColor: repositoryNameBorderColor ? "#d73a4a" : "#CCCCCC" }]} >
                <TextInput autoCapitalize={"none"} value={repositoryName} onChangeText={e => { setRepositoryName(e); setRepositoryNameBorderColor(null); }} style={styles.textStyle} placeholder='Repository name' />
            </View>
            {
                repositoryNameBorderColor &&
                <MyText style={{ color: repositoryNameBorderColor ? "#d73a4a" : "#CCCCCC", marginTop: 5 }} >Repository name is required</MyText>
            }
            <View style={[styles.textInputStyle, { borderColor: ratingBorderColor ? "#d73a4a" : "#CCCCCC" }]} >
                <TextInput value={rating} onChangeText={e => { setRating(e); setRatingBorderColor(null); }} style={styles.textStyle} placeholder='Rating between 0 and 100' />
            </View>
            {
                ratingBorderColor &&
                <MyText style={{ color: ratingBorderColor ? "#d73a4a" : "#CCCCCC", marginTop: 5 }} >Rating is required</MyText>
            }

            <View style={[styles.textInputStyle, { borderColor: "#CCCCCC" }]} >
                <TextInput autoCapitalize={"none"} value={review} onChangeText={e => { setReview(e); }} style={styles.textStyle} placeholder='Review' />
            </View>


            <Pressable onPress={() => onsubmit()} style={styles.buttonStyle} >
                <MyText style={{ color: "white", fontSize: 18, fontFamily: "Arial" }}>Create a review</MyText>
            </Pressable>



        </View>
    );
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: "100%", height: 50, borderWidth: 1, borderColor: "#CCCCCC", paddingHorizontal: 10, marginTop: 20, borderRadius: 4
    },
    buttonStyle: {
        backgroundColor: "#0366d6", height: 50,
        justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 4
    },
    textStyle: {
        height: "100%",
        color: Platform.select({
            android: 'green',
            ios: 'blue',
            default: 'black',
        }),

    }
});
