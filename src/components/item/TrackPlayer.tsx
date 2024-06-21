import {useContext} from "react";
import Query from "../query/Query";
import {AxiosAppContext} from "../wrapper/api/App";
import {PlayerContext} from "../wrapper/player/Player";
import PlayerDecrypt from "../player/Decrypt";

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
            {({ media: { sources: { [0]: { url } } } }) => {


                return (
                    <p>{url}</p>
                )
            }}
        </Query>
    )
}
