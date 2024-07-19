import {createContext, useState} from 'react';

export const AppContext = createContext(null);

export default function AppWrapper({ children }) {
    const [app, setApp] = useState();

    return (
        <AppContext.Provider value={{ app, setApp }}>
            {children}
        </AppContext.Provider>
    );
}
