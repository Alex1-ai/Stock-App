import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql
} from '@apollo/client';


const client = new ApolloClient({
    uri: 'https://fujisawachoniinuma.stepzen.net/api/fair-quoll/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Apikey fujisawachoniinuma::stepzen.net+1000::9ca6fe82e32a095eb315adda20e225ab73d97c15498f038def62ba9a7e0ede78'
    }
});


export default client;