import {PlayerSource} from "../player/Source";
import {Player} from "../player/Player";
import {useContext, useEffect} from "react";
import {TrackContext} from "../player/wrapper/Track";
import {AxiosAppContext} from "../wrapper/api/App";

export default function TrackPlayer() {
    const { client } = useContext(AxiosAppContext);

    const { track } = useContext(TrackContext);

    useEffect(() => {
        const { id } = track;

        client.get('play', { params: { id, quality: 'MP3_320' } });
    }, [track]);

    return (
        <Player>
            <PlayerSource source="" />
        </Player>
    )
}
