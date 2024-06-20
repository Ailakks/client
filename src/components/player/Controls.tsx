import {Tooltip} from "../Tooltip";
import {useContext} from "react";
import {PlayerAudioContext} from "./Audio";
import {LoopMode, PlayerQueueContext} from "./Queue";

export function PlayerControls() {
    const { isPlaying, play, pause, getPlayerCurrentTime, setPlayerCurrentTime } = useContext(PlayerAudioContext);
    const { shuffle, loop, togglePlay, handleNext, alterLoop, handlePrevious, alterShuffle } = useContext(PlayerQueueContext);

    return (
        <div className="flex w-full justify-center space-x-8 text-md">
            <Tooltip text="Shuffle">
                <button className={shuffle && "selected"} onClick={() => alterShuffle()}>
                    <i className="fa-solid fa-shuffle" />
                </button>
            </Tooltip>
            <Tooltip text="Previous">
                <button onClick={() => handlePrevious(getPlayerCurrentTime, setPlayerCurrentTime)}>
                    <i className="fa-solid fa-backward-step" />
                </button>
            </Tooltip>
            <button onClick={() => togglePlay(isPlaying, play, pause)}>
                <i className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} />
            </button>
            <Tooltip text="Next">
                <button onClick={() => handleNext(pause)}>
                    <i className="fa-solid fa-forward-step" />
                </button>
            </Tooltip>
            <Tooltip text="Loop">
                <button className={loop > 0 && "selected"} onClick={() => alterLoop()}>
                    <i className={Object.values(LoopMode)[loop].icon} />
                </button>
            </Tooltip>
        </div>
    )
}
