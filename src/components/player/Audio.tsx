import {Fragment, useContext, useEffect, useRef, useState} from "react";
import {PlayerTrackContext} from "./wrapper/Track";
import {PlayerSourceContext} from "./wrapper/Source";

export function PlayerAudio({ children }) {
    const { current: track } = useContext(PlayerTrackContext);
    const { source } = useContext(PlayerSourceContext);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const player = useRef();

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
    }, [track]);

    return (
        <Fragment>
            <audio
                ref={player}
                src={source}
                autoPlay={true}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={updateTime}
                onEnded={() => handleEnded(play, setCurrentTime)}
            />
            {children}
        </Fragment>
    )
}
