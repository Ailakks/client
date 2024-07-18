import {useContext} from "react";
import Query, {QueryContext} from "../query/Query";
import {PlayerContext} from "../wrapper/player/Player";
import {PlayerDecrypt} from "../player/Decrypt";
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
    const { useClient } = useContext(AxiosContext);

    const { track: { id }, app: { url } } = useContext(PlayerContext);

    const request = useClient({ url: `${url}/play`, params: { id, quality: 'MP3_128' } });

    return (
        <Query request={request}>
            <Source />
        </Query>
    )
}

function Source() {
    const { track: { id } } = useContext(PlayerContext);

    const { response: { media: { sources: { [0]: { url } }, cipher: { type } } } } = useContext(QueryContext);

    return (
        <Player>
            <PlayerSource source={`${import.meta.env.VITE_API_PROXY_URL}/play?url=${url}&decrypt=${type}&key=${id}`} />
        </Player>
    )
}
