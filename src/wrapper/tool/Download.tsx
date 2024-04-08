import {createContext} from "react";

export const DownloadContext = createContext(null);

export default function DownloadWrapper({ children }) {
    const download = (name, blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.style.display = 'none';
        a.href = url;
        a.download = name;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <DownloadContext.Provider value={{ download }}>
            {children}
        </DownloadContext.Provider>
    )
}
