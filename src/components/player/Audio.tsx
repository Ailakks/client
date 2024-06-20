import {useContext, useEffect} from "react";
import {PlayerTrackContext} from "./wrapper/Track";

export function PlayerAudio() {
    const { current } = useContext(PlayerTrackContext);

    const play = () => {
        player.current?.play();
    };

    const pause = () => {
        player.current?.pause();
    };

    const getCurrentTime = () => {
        return player.current?.currentTime;
    };

    const setPlayerCurrentTime = (time) => {
        player.current.currentTime = time;

        updateTime();
    };

    const updateTime = () => {
        setCurrentTime(getCurrentTime());
    };

    useEffect(() => {
        pause();
    }, [current]);

    return (
        <p>test</p>
    )
}
