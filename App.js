 
import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Mainn from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';   
import Constants from 'expo-constants';
const apolloClient = createApolloClient();
const App = () => {
  console.log(JSON.stringify(Constants.manifest), "Constants");
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>  
      <Mainn />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;

