import {Tooltip} from "../Tooltip";
import {useContext} from "react";
import {PlayerQueueContext} from "./Queue";

export function PlayerControls() {
    const { isPlaying, shuffle, loop, LoopMode, togglePlay, handleNext, alterLoop, handleBefore, alterShuffle } = useContext(PlayerQueueContext);

    return (
        <div>
            <Tooltip text="Shuffle">
                <button onClick={() => alterShuffle()}>
                    <i className="fa-solid fa-shuffle" />
                </button>
            </Tooltip>
            <Tooltip text="Previous">
                <button onClick={() => handleBefore()}>
                    <i className="fa-solid fa-backward-step" />
                </button>
            </Tooltip>
            <button onClick={() => togglePlay()}>
                <i className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} />
            </button>
            <Tooltip text="Next">
                <button onClick={() => handleNext()}>
                    <i className="fa-solid fa-forward-step" />
                </button>
            </Tooltip>
            <Tooltip text="Loop">
                <button onClick={() => alterLoop()}>
                    <i className={Object.values(LoopMode)[loop].icon} />
                </button>
            </Tooltip>
        </div>
    )
}
