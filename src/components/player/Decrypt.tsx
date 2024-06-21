import {createContext} from "react";
import axios from "axios";

export const PlayerDecryptContext = createContext();

export default function PlayerDecrypt({ children }) {
    const fetch = ({ url }) => {
        return axios.get(url, { responseType: "arraybuffer" }).then(({ data }) => data);
    };

    const decrypt = (array) => {
        const trackBuffer = Buffer.from(array, 'binary');

        let chunk_size = 2048;
        const blowFishKey = getBlowfishKey(id.toString());
        let i = 0;
        let position = 0;

        const buffer = Buffer.alloc(trackBuffer.length);

        while (position < trackBuffer.length) {
            let chunk;
            if (trackBuffer.length - position >= 2048) {
                chunk_size = 2048;
            } else {
                chunk_size = trackBuffer.length - position;
            }
            chunk = Buffer.alloc(chunk_size);

            trackBuffer.copy(chunk, 0, position, position + chunk_size);

            let chunkString;
            if (i % 3 > 0 || chunk_size < 2048) {
                chunkString = chunk.toString('binary');
            } else {
                chunkString = decryptChunk(chunk, blowFishKey);
            }

            Buffer.from(chunkString, 'binary').copy(buffer, position);
            position += chunk_size;
            i++;
        }

        return buffer;
    };

    return (
        <PlayerDecryptContext.Provider value={{ decrypt }}>
            {children}
        </PlayerDecryptContext.Provider>
    )
}
