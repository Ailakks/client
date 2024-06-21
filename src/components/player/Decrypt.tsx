import {createContext} from "react";
import axios from "axios";
import {Buffer} from "buffer";

export const PlayerDecryptContext = createContext();

export default function PlayerDecrypt({ children }) {
    const get = async (url) => {
        const buffer = await this.fetch(url);

        return this.toBlob(this.decrypt(buffer));
    };

    const fetch = async (url) => {
        return axios.get(url, { responseType: "arraybuffer" }).then(({ data }) => data);
    };

    const getBlowfishKey = (id) => {
        let SECRET = "g4el58wc" + "0zvf9na1";
        let idMd5 = md5(id);
        let blowfishKey = "";
        for (let i = 0; i < 16; i++) {
            blowfishKey += String.fromCharCode(
                idMd5.charCodeAt(i) ^ idMd5.charCodeAt(i + 16) ^ SECRET.charCodeAt(i)
            );
        }

        return blowfishKey;
    };

    const decrypt = (id, array) => {
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

    const toBlob = (buffer) => {
        return URL.createObjectURL(new Blob([buffer], { type: 'audio/mp3' }));
    };

    return (
        <PlayerDecryptContext.Provider value={{ get, fetch, decrypt, toBlob }}>
            {children}
        </PlayerDecryptContext.Provider>
    )
}
