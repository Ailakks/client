import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import cookie from 'react-cookies';

export const setCookie = (name, value) => {
    cookie.save(name, value, { path: "/" });
};

export const removeCookie = (name) => {
    cookie.remove(name, { path: "/" });
};

export const setToken = (value) => {
    setCookie('token', value);
};

export const removeToken = () => {
    removeCookie('token');
};

export const getToken = () => cookie.load('token');

export const hasToken = getToken() !== undefined;

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
