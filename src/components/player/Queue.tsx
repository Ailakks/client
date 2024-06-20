import {createContext, useContext, useState} from "react";
import {QueueContext} from "./wrapper/Queue";
import {TrackContext} from "./wrapper/Track";

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

    const togglePlay = (isPlaying, play, pause) => {
        if (isPlaying) {
            pause();
            return;
        }

        play();
    };

    const getShuffle = (index) => {
        let random = index;

        while (random === index) {
            random = Math.floor(Math.random() * queue.length - 1) + 1;
        }

        return random;
    };

    const getNext = (index) => {
        if (shuffle) {
            return getShuffle(index);
        }

        return (index + 1) % queue.length;
    };

    const handleNext = (pause) => {
        if (loop === 2) {
            setLoop(1);
        }

        const index = queue.indexOf(track);

        if (index + 1 >= queue.length && loop === 0) {
            pause();

            return;
        }

        set(getNext(index));
    };

    const alterLoop = () => {
        const values = Object.values(LoopMode);

        setLoop((loop + 1 + values.length) % values.length);
    };

    const handlePrevious = () => {
        if (getPlayerCurrentTime() > 3) {
            setPlayerCurrentTime(0);

            return;
        }

        const index = queue.indexOf(track);

        set((index - 1 + queue.length) % queue.length);
    };

    const alterShuffle = () => {
        setShuffle(!shuffle);
    };

    const set = (index) => {
        setTrack(queue[index]);
    };

    const handleEnded = (play, setCurrentTime) => {
        if (loop === 2) {
            getPlayerCurrentTime(0);
            play();

            return;
        }

        handleNext();
    };

    return (
        <PlayerQueueContext.Provider value={{ togglePlay, loop, shuffle, handleNext, handlePrevious, handleEnded, alterLoop, alterShuffle }}>
            {children}
        </PlayerQueueContext.Provider>
    )
}
