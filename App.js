 
import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Mainn from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';   
const apolloClient = createApolloClient();
const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>  
      <Mainn />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;

