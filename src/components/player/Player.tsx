import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";
import {PlayerQueue} from "./Queue";
import {PlayerTrackBar} from "./controls/bar/Track";

export function Player({ children }) {
    return (
        <PlayerQueue>
            <PlayerAudio>
                <div className="p-10 space-y-5">
                    <PlayerControls />
                    <PlayerTrackBar />
                </div>
            </PlayerAudio>
            {children}
        </PlayerQueue>
    )
}
