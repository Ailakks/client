import {createContext, useContext, useState} from "react";
import {QueueContext} from "./wrapper/Queue";
import {TrackContext} from "./wrapper/Track";
import {AudioContext} from "./wrapper/Audio";

export const PlayerQueueContext = createContext(null);

export const LoopMode = {
    NONE: {icon: 'fa-regular fa-arrows-repeat'},
    LIST: {icon: 'fa-regular fa-arrows-repeat'},
    SONG: {icon: 'fa-regular fa-arrows-repeat-1'},
};

export function PlayerQueue({ children }) {
    const { queue } = useContext(QueueContext);
    const { track, setTrack } = useContext(TrackContext);

    const [loop, setLoop] = useState(0);
    const [shuffle, setShuffle] = useState(false);

    const { isPlaying, play, pause } = useContext(AudioContext);

    const togglePlay = () => {
        if (isPlaying) {
            pause();
            return;
        }

        play();
    };

    const getShuffle = (index) => {
        let random = index;

        while (random === index) {
            random = Math.floor(Math.random() * queue.list.length - 1) + 1;
        }

        return random;
    };

    const getNext = (index) => {
        if (shuffle) {
            return getShuffle(index);
        }

        return (index + 1) % queue.list.length;
    };

    const handleNext = (pause) => {
        if (loop === 2) {
            setLoop(1);
        }

        const index = queue.list.indexOf(track.value);

        if (index + 1 >= queue.list.length && loop === 0) {
            pause();
            return;
        }

        set(getNext(index));
    };

    const alterLoop = () => {
        const values = Object.values(LoopMode);

        setLoop((loop + 1 + values.length) % values.length);
    };

    const handleBefore = (getCurrentTime, setCurrentTime) => {
        if (getCurrentTime() > 3) {
            setCurrentTime(0);
            return;
        }

        const index = queue.list.indexOf(track.value);

        set((index - 1 + queue.list.length) % queue.list.length);
    };

    const alterShuffle = () => {
        setShuffle(!shuffle);
    };

    const set = (index) => {
        setTrack({
            ...track,
            value: queue.list[index],
        });
    };

    const handleEnded = (play, setCurrentTime) => {
        if (loop === 2) {
            setCurrentTime(0);
            play();
            return;
        }

        handleNext();
    };

    return (
        <PlayerQueueContext.Provider value={{ togglePlay, loop, shuffle, handleNext, handleBefore, handleEnded, alterLoop, alterShuffle }}>
            {children}
        </PlayerQueueContext.Provider>
    )
}
