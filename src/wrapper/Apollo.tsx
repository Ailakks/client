import {useContext} from "react";
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {CookiesContext} from "./tool/Cookies";

export default function ApolloWrapper({ children }) {
    const { getToken } = useContext(CookiesContext);

    const ApiClient = new ApolloClient({
        uri: import.meta.env.VITE_API_GRAPH_BASE_URL,
        cache: new InMemoryCache({ dataIdFromObject: false }),
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });


    return (
        <ApolloProvider client={ApiClient}>
            {children}
        </ApolloProvider>
    )
}
