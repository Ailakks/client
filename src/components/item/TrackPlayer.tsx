import {useContext} from "react";
import Query from "../query/Query";
import {AxiosAppContext} from "../wrapper/api/App";
import {PlayerContext} from "../wrapper/player/Player";
import PlayerDecrypt, {PlayerDecryptContext} from "../player/Decrypt";
import {Player} from "../player/Player";
import {PlayerSource} from "../player/Source";

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
    const { get } = useContext(PlayerDecryptContext);

    const { track: { id } } = useContext(PlayerContext);

    const request = useClient({ url: 'play', params: { id, quality: 'MP3_320' } });

    return (
        <Query request={request}>
            {({ media: { sources: { [0]: { url } } } }) => {
                const blob = await get(url);

                if (!blob) {
                    return (
                        <p>loading</p>
                    )
                }

                return (
                    <Player>
                        <PlayerSource source={blob} />
                    </Player>
                )
            }}
        </Query>
    )
}
