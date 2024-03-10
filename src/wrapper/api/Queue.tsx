import {createContext, useContext, useState} from 'react';
import {AxiosContext} from "../Axios";

export const QueueContext = createContext(null);

export default function QueueWrapper({ children }) {
    const [queue, setQueue] = useState([]);

    const { client } = useContext(AxiosContext);

    const upload = async (folder, files) => {
        for (const file of files) {
            await client.post('file', { folder, file }, { onUploadProgress: (event) => {
                    const index = queue.findIndex(({ file: { name } }) => name === file.name);

                    if (index > -1) {
                        queue[index] = { file, event };

                        return;
                    }

                    setQueue([ ...queue, { file, event } ]);
                }});
        }
    };

    return (
        <QueueContext.Provider value={{ upload, queue }}>
            {children}
        </QueueContext.Provider>
    );
}
