import {createContext, useContext, useEffect, useState} from 'react';
import {AxiosContext} from "../Axios";
import {ModalContext} from "../ui/Modal";
import QueueList from "../../components/data/queue/QueueList";

export const QueueContext = createContext(null);

export default function QueueWrapper({ children }) {
    const [queue, setQueue] = useState([]);

    const { uploadClient } = useContext(AxiosContext);

    const { setCurrent } = useContext(ModalContext);

    const upload = async (folder, files, complete) => {
        for (const file of files) {
            await uploadClient.post('file', { folder, file }, { onUploadProgress: (event) => {
                const index = queue.findIndex(({ file: { name } }) => name === file.name);

                if (index > -1) {
                    queue[index] = { file, event };

                    return;
                }

                const { progress } = event;

                if (progress === 1) {
                    complete();
                }

                setQueue([ ...queue, { file, event } ]);
            }});
        }
    };

    useEffect(() => {
        if (queue.length < 1) {
            return;
        }

        setCurrent(<QueueList />);
    }, [queue]);

    return (
        <QueueContext.Provider value={{ upload, queue }}>
            {children}
        </QueueContext.Provider>
    );
}
