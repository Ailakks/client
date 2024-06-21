import {useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {AxiosAppContext} from "../wrapper/api/App";
import {PlayerContext} from "../wrapper/player/Player";
import PlayerDecrypt, {PlayerDecryptContext} from "../player/Decrypt";
import {Player} from "../player/Player";
import {PlayerSource} from "../player/Source";
import {AxiosContext} from "../wrapper/api/Api";

export default function TrackPlayer() {
    const { track } = useContext(PlayerContext);

    if (!track) {
        return (
            <div>
                <p>Nothing here...</p>
            </div>
        )
    }

    return (
       <PlayerDecrypt>
           <Body />
       </PlayerDecrypt>
    )
}

function Body() {
    const { useClient } = useContext(AxiosAppContext);

    const { track: { id } } = useContext(PlayerContext);

    const request = useClient({ url: 'play', params: { id, quality: 'MP3_320' } });

    return (
        <Query request={request}>
            <Source />
        </Query>
    )
}

function Source() {
    const { useClient } = useContext(AxiosContext);
    const { track: { id } } = useContext(PlayerContext);
    const { decrypt, toBlob } = useContext(PlayerDecryptContext);

    const { response: { media: { sources: { [0]: { url } } } } } = useContext(QueryContext);

    const request = useClient({ url, responseType: "arraybuffer" });

    return (
        <Query request={request}>
            {(buffer) => {
                return (
                    <Player>
                        <PlayerSource source={toBlob(decrypt(id, buffer))} />
                    </Player>
                )
            }}
        </Query>
    )
}
