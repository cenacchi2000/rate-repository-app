import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
 import { setContext } from '@apollo/client/link/context';
 import Constants from 'expo-constants'; 
// You might need to change this depending on how you have configured the Apollo Server URI
 
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const createApolloClient = (authStorage) => { 
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return { headers: { ...headers, authorization: accessToken ? `Bearer ${accessToken}` : '', }, };
    } catch (e) { console.log(e); return { headers, }; }
  }); return new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache(), });
};
export default createApolloClient;
