import {Fragment, useContext, useEffect, useRef, useState} from "react";
import {TrackContext} from "./wrapper/Track";
import {SourceContext} from "./wrapper/Source";
import {QueueContext} from "./wrapper/Queue";

export function PlayerAudio({ children }) {
    const { current: track } = useContext(TrackContext);
    const { source } = useContext(SourceContext);
    const { handleEnded } = useContext(QueueContext);

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
