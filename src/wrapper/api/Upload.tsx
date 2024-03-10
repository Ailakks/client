import {createContext} from 'react';

export const UploadContext = createContext(null);

export default function UploadWrapper({ children }) {
    const upload = () => {

    };

    return (
        <UploadContext.Provider value={{ upload }}>
            {children}
        </UploadContext.Provider>
    );
}
