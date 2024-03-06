import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {getToken} from "../main";

const ApiClient = new ApolloClient({
    uri: import.meta.env.VITE_API_BASE_URL,
    cache: new InMemoryCache(),
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});

export default function ApolloWrapper({ children }) {
    return (
        <ApolloProvider client={ApiClient}>
            {children}
        </ApolloProvider>
    )
}
