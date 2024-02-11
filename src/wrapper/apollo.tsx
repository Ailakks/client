import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const ApiClient = new ApolloClient({
    uri: import.meta.env.VITE_API_BASE_URL,
    cache: new InMemoryCache(),
    headers: {

    }
});

export default function ApolloWrapper({ children }) {
    return (
        <ApolloProvider client={ApiClient}>
            {children}
        </ApolloProvider>
    )
}
