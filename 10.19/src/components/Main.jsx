import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import SingleRepositoryView from './SingleRepositoryView';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.mainBackground,
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/SingleRepositoryView" exact>
                    <SingleRepositoryView />
                </Route>
                <Route path="/SignIn" exact>
                    <SignIn />
                </Route>
                <Route path="/SignUp" exact>
                    <SignUp />
                </Route>
                <Route path="/CreateReview" exact>
                    <CreateReview />
                </Route>
                <Route path="/MyReviews" exact>
                    <MyReviews />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;
