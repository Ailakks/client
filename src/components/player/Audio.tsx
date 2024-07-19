import {createContext, useContext, useEffect, useRef, useState} from "react";
import {TrackContext} from "./wrapper/Track";
import {SourceContext} from "./wrapper/Source";
import {PlayerQueueContext} from "./Queue";

export const PlayerAudioContext = createContext();

export function PlayerAudio({ children }) {
    const { track } = useContext(TrackContext);
    const { source } = useContext(SourceContext);
    const { handleEnded } = useContext(PlayerQueueContext);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const [loaded, setLoaded] = useState(false);

    const player = useRef();

    const play = () => {
        player.current?.play();
    };

    const pause = () => {
        player.current?.pause();
    };

    const getPlayerCurrentTime = () => {
        return player.current?.currentTime;
    };

    const setPlayerCurrentTime = (time) => {
        player.current.currentTime = time;

        updateTime();
    };

    const updateTime = () => {
        setCurrentTime(getPlayerCurrentTime());
    };

    useEffect(() => {
        pause();
    }, [track]);

    useEffect(() => {
        setLoaded(true);
    }, [player.current]);

    return (
        <PlayerAudioContext.Provider value={{ player, isPlaying, play, pause, currentTime, setCurrentTime, getPlayerCurrentTime, setPlayerCurrentTime }}>
            <audio
                ref={player}
                src={source}
                autoPlay={true}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={updateTime}
                onEnded={() => handleEnded(play, pause, setPlayerCurrentTime)}
            />
            {loaded ? children : <p>loading</p>}
        </PlayerAudioContext.Provider>
    )
}
